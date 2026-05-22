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
    // B站动态API
    const apiUrl = `https://api.bilibili.com/x/dynamic/feed/detail?id=${id}`;
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.bilibili.com/',
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ ok: false, error: '获取失败' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const data: any = await response.json();
    
    if (data.code !== 0 || !data.data?.card) {
      return new Response(JSON.stringify({ ok: false, error: '动态不存在或已删除' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const card = data.data.card;
    const cardData = JSON.parse(card.card);
    
    // 提取标题和内容
    let title = '';
    let content = '';
    let images: string[] = [];

    if (cardData.item) {
      // 图文动态
      content = cardData.item.description || '';
      title = content.split('\n')[0]?.slice(0, 50) || 'B站动态';
      if (cardData.item.pictures) {
        images = cardData.item.pictures.map((p: any) => p.img_src);
      }
    } else if (cardData.vest) {
      // 转发动态
      content = cardData.vest.content || '';
      title = '转发动态';
    } else {
      content = cardData.content || cardData.dynamic || '';
      title = content.split('\n')[0]?.slice(0, 50) || 'B站动态';
    }

    // 清理HTML标签
    content = content.replace(/<[^>]+>/g, '').trim();

    const result: BiliDynamic = {
      ok: true,
      data: {
        title,
        content: content.slice(0, 1000),
        images,
        url: `https://t.bilibili.com/${id}`,
        time: cardData.ctime ? new Date(cardData.ctime * 1000).toLocaleString('zh-CN') : '',
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
