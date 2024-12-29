"use client";

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export default function ProjectCreatePage() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectMember, setProjectMember] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/api/create-project', {
        name: projectName,
        description: projectDescription,
        member : projectMember,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('프로젝트 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
        <h1 className="text-2xl font-bold mb-8">
            프로젝트 생성
        </h1>
        <Form>
            <form className="space-y-8 max-w-96 mx-auto" onSubmit={handleSubmit}>
                <div>
                <label htmlFor="projectName">프로젝트 이름</label>
                <Input
                    id = "projectName"
                    type = "text"
                    placeholder = "프로젝트명을 입력하세요"
                    value = {projectName}
                    onChange = {(e) => setProjectName(e.target.value)}
                    required
                />
                </div>
                <div>
                <label htmlFor="projectDescription">프로젝트 설명</label>
                <Input
                    id = "projectDescription"
                    type = "text"
                    placeholder = "설명을 입력하세요"
                    value = {projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    required
                />
                </div>
                <div>
                    <label htmlFor="projectMember">
                        프로젝트 인원 추가
                    </label>
                <Input
                    id = "projectMember"
                    type = "text"
                    placeholder = "추가할 인원의 이메일을 입력하세요"
                    value = {projectMember}
                    onChange={(e) => setProjectMember(e.target.value)}
                    required
                />
                    {/* <Button
                        type = "submit"
                        className = "bg-primary-500"
                    >
                        추가
                    </Button> */}
                {/* {members.map((member, index) => ( */}
                <Badge
                    // key={index}
                        variant="secondary"
                        className="w-fit flex items-center gap-2"
                >
                    {/* {member} */}
                        {projectMember}
                        <X className="w-3 h-3" />
                </Badge>
                </div>
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-primary-500"
                >
                {isLoading ? '프로젝트 생성 중...' : '프로젝트 생성'}
                </Button>
            </form>
        </Form>
      {message && <p>{message}</p>}
    </div>
  );
}
