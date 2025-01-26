"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAvatarFallback } from "@/lib/avatar";
import { teamListMock } from "@/mock/team";
import { Button } from '@/components/ui/button';
import { useState } from "react";

const bgColors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-slate-400",
    "bg-pink-400",
    "bg-teal-400",
    "bg-cyan-400",
]

export default function ProjectManageMentPage() {
    // 프로젝트 관리 페이지
    const [checkItems, setCheckItems] = useState([]);

    const handleSingleCheck = (checked, id) => {
        if (checked) {
          // 단일 선택 시 체크된 아이템을 배열에 추가
          setCheckItems(prev => [...prev, id]);
        } else {
          // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
          setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

      // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if(checked) {
        // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const idArray = [];
            teamListMock.forEach((el) => idArray.push(el.id));
            setCheckItems(idArray);
        }
        else {
        // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    }  

    // 체크된 항목을 삭제하는 함수
    // const handleDeleteChecked = () => {
    //     setCheckItems((...prev) => prev.filter((checkItems) => !checkItems.checked));
    // }

    return(
        <>
            <h1 className="text-2xl font-bold mb-8">
                프로젝트 관리
            </h1>
            <div className="border rounded-md overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="text-center border-r">
                                <input type="checkbox" name="select-all"
                                    onChange={(e) => handleAllCheck(e.target.checked)}
                                    // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                                    checked={checkItems.length === teamListMock.length ? true : false}
                                />   
                            </TableHead>
                            <TableHead className="text-center border-r">
                                프로젝트 이름
                            </TableHead>
                            <TableHead className="text-center border-r">
                                설명
                            </TableHead>
                            <TableHead className="text-center">
                                프로젝트 멤버
                            </TableHead>     
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teamListMock.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="text-center border-r">
                                    <input type='checkbox' name={`select-${project.id}`}
                                           onChange={(e) => handleSingleCheck(e.target.checked, project.id)}
                                           // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                           checked={checkItems.includes(project.id) ? true : false} 
                                    />
                                </TableCell>
                                <TableCell className="text-center border-r">
                                    {project.name}
                                </TableCell>
                                <TableCell className="text-center border-r">
                                    {project.description}
                                </TableCell>
                                <TableCell className="text-center flex">
                                    {project.members.length > 0 && project.members.map((member, index) => (
                                        <div key={`${member.id}_${index}`} className={`w-10 h-10 text-sm ${bgColors[Math.floor(Math.random() * bgColors.length)]} text-white rounded-full flex items-center justify-center font-semibold`}>
                                            {getAvatarFallback(member.name)}
                                        </div>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div 
                className="w-full flex justify-end"
            >
            <Button
                // onClick={handleDeleteChecked}
                // disabled={!handleSingleCheck}
                className="bg-primary-500"
            >
                삭제
            </Button>
            {/* <Button
                className="bg-primary-500"

            >
                수정
            </Button> */}
            </div>
        </>
    )
}