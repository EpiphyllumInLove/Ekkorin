#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import sys
from pathlib import Path

IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'}

def extract_number(filename: str) -> int:
    match = re.search(r'd(\d+)', filename, re.IGNORECASE)
    return int(match.group(1)) if match else -1

def generate_works_ts(folder_path: str) -> str:
    folder = Path(folder_path)
    if not folder.is_dir():
        raise NotADirectoryError(f"路径不存在或不是文件夹: {folder_path}")

    files = []
    for entry in folder.iterdir():
        if entry.is_file() and entry.suffix.lower() in IMAGE_EXTENSIONS:
            num = extract_number(entry.name)
            if num == -1:
                print(f"警告：跳过不符合命名规范的文件（缺少 d<数字>）：{entry.name}")
                continue
            files.append((num, entry.name))

    if not files:
        raise RuntimeError("未找到任何符合命名规范的图片文件（文件名需包含 d<数字>）")

    files.sort(key=lambda x: x[0])  # 按数字从小到大排序

    works_entries = []
    for num, filename in files:
        work_id = str(num)  # id 就是文件名中的数字（字符串形式）
        image_path = f"/images/{filename}"
        entry = f"""  {{
    id: '{work_id}',
    title: '',  // 请填写标题
    image: '{image_path}',
    bilibili: '',  // 请填写B站动态ID
  }}"""
        works_entries.append(entry)

    header = """// 作品数据
// 图片放在 public/images/ 目录下
// MD 文件放在 public/md/ 目录下（文件名对应 id）

export interface Work {
  id: string;
  title: string;
  image: string;       // 图片路径，如 '/images/001.jpg'
  bilibili?: string;   // B站动态ID，如 '732456789012345678'
  // 其他可选字段可根据需要添加，例如 alt, width, height, hasMd 等
}

export const works: Work[] = [
"""
    footer = """
];"""
    return header + ",\n".join(works_entries) + footer

def main():
    if len(sys.argv) != 2:
        print("用法: python generate_works.py <图片文件夹路径>")
        print("示例: python generate_works.py ./public/images")
        sys.exit(1)

    folder_path = sys.argv[1]
    try:
        output = generate_works_ts(folder_path)
        print(output)
        # 如果需要直接写入文件，取消下面两行的注释
        # with open("works_generated.ts", "w", encoding="utf-8") as f:
        #     f.write(output)
    except Exception as e:
        print(f"错误: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()