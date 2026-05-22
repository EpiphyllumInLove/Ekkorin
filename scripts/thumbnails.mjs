// 生成缩略图脚本
// 在部署前运行：node scripts/thumbnails.mjs

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'public/images');
const thumbDir = path.join(process.cwd(), 'public/thumbs');

// 创建缩略图目录
if (!fs.existsSync(thumbDir)) {
  fs.mkdirSync(thumbDir, { recursive: true });
}

const files = fs.readdirSync(imagesDir).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));

(async () => {
  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(thumbDir, file);
    
    if (fs.existsSync(outputPath)) {
      console.log(`已存在: ${file}`);
      continue;
    }

    try {
      await sharp(inputPath)
        .resize(400, 250, { fit: 'cover', position: 'centre' })
        .webp({ quality: 80 })
        .toFile(outputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
      
      // 也生成一张大一点的缩略图用于详情页
      await sharp(inputPath)
        .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outputPath.replace(/\.(png|jpg|jpeg)$/i, '-lg.webp'));

      console.log(`✓ ${file}`);
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }
  console.log('缩略图生成完成！');
})();
