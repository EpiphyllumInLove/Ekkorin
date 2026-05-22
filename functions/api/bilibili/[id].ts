// Cloudflare Functions 服务端接口
// 用于获取B站动态内容（避免跨域问题）

interface BiliDynamic {
  ok: boolean;
  data?: {
    title: string;
    content: string;
    images: string[];
    url: string;
    time: string;
  };
  error?: string;
}

export const onRequest: PagesFunction = async (context) => {
  const { id } = context.params;
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // B站动态API - v2接口（新版）
    const apiUrl = `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/detail?id=${id}`;
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com/',
        'Origin': 'https://www.bilibili.com',
        'Accept': 'application/json, text/plain, */*',
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ ok: false, error: 'B站API请求失败' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const data: any = await response.json();

    if (data.code !== 0 || !data.data?.item) {
      // 备用：尝试旧接口
      const fallbackUrl = `https://api.bilibili.com/x/dynamic/feed/detail?id=${id}`;
      const fbResponse = await fetch(fallbackUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.bilibili.com/',
        },
      });
      if (fbResponse.ok) {
        const fbData: any = await fbResponse.json();
        if (fbData.code === 0 && fbData.data?.card) {
          const card = fbData.data.card;
          const cardData = typeof card.card === 'string' ? JSON.parse(card.card) : card.card;
          let fbContent = '';
          let fbImages: string[] = [];

          if (cardData.item) {
            fbContent = cardData.item.description || '';
            if (cardData.item.pictures) {
              fbImages = cardData.item.pictures.map((p: any) => p.img_src);
            }
          } else {
            fbContent = cardData.content || cardData.dynamic || '';
          }

          fbContent = fbContent.replace(/<[^>]+>/g, '').trim();

          return new Response(JSON.stringify({
            ok: true,
            data: {
              title: fbContent.split('\n')[0]?.slice(0, 50) || 'B站动态',
              content: fbContent.slice(0, 1000),
              images: fbImages,
              url: `https://t.bilibili.com/${id}`,
              time: cardData.ctime ? new Date(cardData.ctime * 1000).toLocaleString('zh-CN') : '',
            },
          }), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
      }
      return new Response(JSON.stringify({ ok: false, error: '动态不存在或已删除' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const item = data.data.item;
    const modules = item.modules || {};

    // 提取内容
    const descModule = modules.module_dynamic?.desc || {};
    let content = descModule.text || '';
    let title = content.split('\n')[0]?.slice(0, 50) || 'B站动态';

    // 提取图片
    let images: string[] = [];
    const majorModule = modules.module_dynamic?.major || {};
    if (majorModule.type === 'MAJOR_TYPE_DRAW') {
      images = (majorModule.draw?.items || []).map((img: any) => img.src);
    }

    // 提取发布时间
    let timestamp = item.id_str ? Math.floor(Number(item.id_str) / 1000000) : 0;
    let timeStr = timestamp ? new Date(timestamp * 1000).toLocaleString('zh-CN') : '';

    // 清理HTML标签
    content = content.replace(/<[^>]+>/g, '').trim();

    const result: BiliDynamic = {
      ok: true,
      data: {
        title,
        content: content.slice(0, 1000),
        images,
        url: `https://t.bilibili.com/${id}`,
        time: timeStr,
      },
    };

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: '服务器错误' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};
