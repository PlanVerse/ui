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
  const [members, setMembers] = useState([]);

function addMember() {
    setProjectMember("");
    if (members.includes(projectMember)) {
        return;
    }
    setMembers([...members, projectMember]);
};

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
                <div className="relative">
                    <label htmlFor="projectMember">
                        프로젝트 인원 추가
                    </label>
                <Input
                    id = "projectMember"
                    type = "text"
                    placeholder = "추가할 인원의 이메일을 입력하세요"
                    value = {projectMember}
                    className = "rounded-sm my-2"
                    onChange={(e) => setProjectMember(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addMember();
                        };
                    }}
                    required
                />
                    {projectMember.length > 0 && (
                            <div
                                className="absolute top-[69px] left-0 right-0 bg-gray-100 p-2"
                                onClick={addMember}
                            >
                                {projectMember}
                            </div>
                        )}
                        <div className="w-full flex gap-2 flex-wrap">
                            {members.length > 0 &&
                                members.map((member, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="w-fit flex items-center gap-2"
                                    >
                                        {member}
                                        <X
                                            className="w-3 h-3"
                                            onClick={() => {
                                                setMembers(members.filter((m) => m !== member));
                                            }}
                                        />
                                    </Badge>
                                ))
                            }
                        </div>

                </div>
                <div className="w-full flex justify-end">
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-primary-500"
                    >
                    {isLoading ? '프로젝트 생성 중...' : '프로젝트 생성'}
                    </Button>
                </div>
            </form>
        </Form>
      {message && <p>{message}</p>}
    </div>
  );
}
