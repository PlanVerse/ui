import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

// 업로드 폴더 설정
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      // 업로드 폴더가 없으면 생성
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      // 파일명 중복 방지를 위해 타임스탬프 추가
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
  }),
});

// Next.js의 기본 bodyParser 비활성화
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// API Route 핸들러
export async function POST(request) {
  upload.single('image')(request, NextResponse, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log('err: ', err);
      return NextResponse.json({ error: err.message });
    } else if (err) {
      console.log('err: ', err);
      return NextResponse.json({ error: '파일 업로드 중 오류가 발생했습니다.' });
    }

    // 업로드된 파일 정보
    const formData = await request.formData();
    const file = formData.get('image');
    console.log('formData: ', file.name);
    
    if (!file) {
      console.log('업로드된 파일이 없습니다.');
      return NextResponse.json({ error: '업로드된 파일이 없습니다.' });
    }

    // 파일 URL 생성
    const fileUrl = `/uploads/${file.name}`;

    // 성공 응답
    return NextResponse.json({
      success: 1,
      file: {
        url: fileUrl,
        // 필요에 따라 추가적인 이미지 데이터 (예: width, height 등)
      },
    });
  });
}