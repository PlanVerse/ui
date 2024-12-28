export default function ProjectCreatePage() {
    // 프로젝트 생성 페이지
    return(
            <h1><b>프로젝트 생성</b></h1>
    )
}

// import { useState } from 'react';
// import axios from 'axios';

// export default function CreateProjectPage() {
//   const [projectName, setProjectName] = useState('');
//   const [projectDescription, setProjectDescription] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     setMessage('');

//     try {
//       const response = await axios.post('/api/create-project', {
//         name: projectName,
//         description: projectDescription,
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('프로젝트 생성 중 오류가 발생했습니다.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>프로젝트 생성</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="projectName">프로젝트 이름</label>
//           <input
//             id="projectName"
//             type="text"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="projectDescription">프로젝트 설명</label>
//           <input
//             id="projectDescription"
//             type="text"
//             value={projectDescription}
//             onChange={(e) => setProjectDescription(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? '프로젝트 생성 중...' : '프로젝트 생성'}
//         </button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
