"use client";

import { useEffect, useRef, useState } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@seg00/editorjs-image-preview";
import Checklist from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import LinkTool from "@editorjs/link";
import NestedList from "@editorjs/list";
import Quote from "@editorjs/quote";
import RawTool from "@editorjs/raw";
import Warning from "@editorjs/warning";
import Marker from "@editorjs/marker";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Table from "@editorjs/table";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Paperclip, Plus, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DetailModal from "@/components/DetailModal";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { getApi, postApi, putApi } from "@/lib/axios";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import Image from "next/image";
import { getAvatarFallback } from "@/lib/avatar";

export default function ProjectWorkflowPage({ token }) {
  const [isLoading, setIsLoading] = useState(true);
  const [editorData, setEditorData] = useState(null);
  const [title, setTitle] = useState("");
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(undefined);
  const [stepList, setStepList] = useState([]);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [managers, setManagers] = useState([]);
  const [member, setMember] = useState("");
  const [members, setMembers] = useState([]);
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");

  const ejInstance = useRef(null);

  const params = useParams();

  const form = useForm({
    resolver: zodResolver(z.string())
  });

  const initEditor = () => {
    const editor = new EditorJS({
      readOnly: false,
      holder: "editor",
      inlineToolbar: ["link", "marker", "bold", "italic"],
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link", "marker"],
          config: {
            placeholder: "Header",
          },
          shortcut: "CMD+SHIFT+H",
        },

        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const bodyData = new FormData();
                bodyData.append("file", file);

                try {
                  const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editor/upload/${params.workflowId}`, {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`
                    },
                    body: bodyData,
                  });
                  const uploadResponseJson = await uploadResponse.json();
                  const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uploadResponseJson.file.url}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    },
                  });
                  const fetchResponseJson = await fetchResponse.json();

                  return await fetchResponseJson;
                } catch (error) {
                  throw new Error(error);
                }
              },
            },
          },
        },

        list: {
          class: NestedList,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+L",
        },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },

        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
          shortcut: "CMD+SHIFT+O",
        },

        warning: Warning,

        marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },

        code: {
          class: CodeTool,
          shortcut: "CMD+SHIFT+C",
        },

        delimiter: Delimiter,

        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+C",
        },

        linkTool: LinkTool,

        raw: RawTool,

        embed: Embed,

        table: {
          class: Table,
          inlineToolbar: true,
          shortcut: "CMD+ALT+T",
        },

      },

      defaultBlock: "paragraph",

      placeholder: "Write something or press / to select a tool",
      autofocus: true,

      data: editorData,

      onReady: () => {
        ejInstance.current = editor;
      },

      onChange: async (api, event) => {
        await api.saver.save();
      },
    });
  };

  function addMember() {
    setMember("");
    if (members.includes(member)) {
      return;
    }
    setMembers([...members, member]);
  };

  async function onSubmit(values) {
    try {
      setDetailModalIsOpen(false);
    } catch (error) {
      return;
    }
  };

  const handleComment = async () => {
    try {
      await postApi(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
        workflowInfoId: params.workflowId,
        content: comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/comment/list/${params.workflowId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComment("");
      setComments(response.data.content.map(content => ({
        id: content.id,
        content: content.content,
        name: content.name,
        createdAt: content.createdAt
      })));
    } catch (error) {
      throw new Error(error);
    }
  };

  const onEditComment = (id) => {
    const commentToEdit = comments.find(comment => comment.id === id);
    if (commentToEdit) {
      setEditCommentId(id);
      setEditCommentContent(commentToEdit.content);
    }
  };

  const handleEditCommentId = async (id) => {
    try {
      await putApi(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
        id,
        workflowInfoId: params.workflowId,
        content: editCommentContent
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/comment/list/${params.workflowId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComments(response.data.content.map(content => ({
        id: content.id,
        content: content.content,
        name: content.name,
        createdAt: content.createdAt
      })));
      setEditCommentId(null);
      setEditCommentContent("");
    } catch (error) {
      console.error(error);
    }
  };

  async function handleAddFile(event) {
    const files = Array.from(event.target.files);
    setFiles(prev => [...prev, ...files]);
  };

  async function handleFileUpload() {
    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editor/file/upload/${params.workflowId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });
      const responseJson = await response.json();
      setFiles(prev => [...prev, ...responseJson.files]);
    } catch (error) {
      throw new Error(error);
    }
  };

  async function handleSave() {
    try {
      const savedData = await ejInstance.current.save();
      if (files.length > 0) {
        await handleFileUpload();
      }
      await putApi(`${process.env.NEXT_PUBLIC_API_URL}/workflow`, {
        workflowInfoId: params.workflowId,
        projectInfoId: params.projectId,
        title,
        content: savedData
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (editorData && ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, [editorData]);

  useEffect(() => {
    async function fetchProjectDetail() {
      try {

        // TODO: 프로젝트 상세 정보 가져오기
        const workflowListResponse = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/workflow/content/${params.workflowId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const stepListResponse = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/step/list/${params.projectId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTitle(workflowListResponse.data.title);
        setEditorData(workflowListResponse.data.content);
        setStepList(stepListResponse.data);
        // setEditorData(response);
      } catch (e) {
        throw new Error(e);
      }
    };

    async function fetchComment() {
      try {
        const response = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/comment/list/${params.workflowId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComments(response.data.content.map(content => ({
          id: content.id,
          content: content.content,
          name: content.name,
          createdAt: content.createdAt
        })));
      } catch (e) {
        throw new Error(e);
      }
    }

    Promise.all([
      fetchProjectDetail(),
      fetchComment()
    ]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4">
      <Input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 border-none text-2xl font-bold p-0 shadow-none focus-visible:ring-0"
      />
      <div className="relative w-full mb-4">
        <p
          className="w-fit text-gray-500 font-semibold cursor-pointer"
          onClick={() => setIsOpenCalendar(!isOpenCalendar)}
        >
          {selectedDateRange?.from ?
            selectedDateRange?.to ?
              `${moment(selectedDateRange.from).format("YYYY-MM-DD")} ~ ${moment(selectedDateRange.to).format("YYYY-MM-DD")}`
              : `${moment(selectedDateRange.from).format("YYYY-MM-DD")}`
            : "기간 선택"}
        </p>
        {isOpenCalendar && (
          <Calendar
            mode="range"
            selected={selectedDateRange}
            onSelect={(range) => setSelectedDateRange(range)}
            className="absolute top-6 left-0 z-10 bg-white shadow-md rounded-md"
          />
        )}
      </div>
      {/* 진행 단계 사용자가 추가할 수 있도록 수정 */}
      <div className="w-full mb-4">
        <Select>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="진행 단계" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {stepList.sort((a, b) => a.sort - b.sort).map(step => (
                <SelectItem key={step.id} value={step.id}>
                  <Badge className={step.color}>
                    {step.name}
                  </Badge>
                </SelectItem>
              ))}
              <SelectItem value="add">
                <div className="flex items-center gap-2">
                  <Plus size={16} />
                  <span>추가</span>
                </div>
              </SelectItem>
              {/* <SelectItem value="접수">
                <Badge variant="secondary">접수</Badge>
              </SelectItem>
              <SelectItem value="진행">
                <Badge className="bg-green-500 text-white">진행</Badge>
              </SelectItem>
              <SelectItem value="오류">
                <Badge variant="destructive" className="text-white">오류</Badge>
              </SelectItem>
              <SelectItem value="검토">
                <Badge className="bg-orange-300 text-white">검토</Badge>
              </SelectItem>
              <SelectItem value="재진행">
                <Badge className="bg-green-400 text-white">재진행</Badge>
              </SelectItem>
              <SelectItem value="완료">
                <Badge className="bg-sky-500 text-white">완료</Badge>
              </SelectItem>
              <SelectItem value="취소">
                <Badge className="bg-red-400 text-white">취소</Badge>
              </SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="relative flex items-center gap-4 w-full mb-4">
        <p className="w-full text-gray-500 font-semibold">
          담당자
        </p>
        <Button
          variant="ghost"
          className="p-0 rounded-none w-9"
          onClick={() => setDetailModalIsOpen(true)}
        >
          <Settings size={24} className="!w-6 !h-6" />
        </Button>
      </div>
      {comments.length > 0 ? (
        <div
          className="flex gap-2 items-center w-full mb-4 cursor-pointer"
          onClick={() => setCommentModalIsOpen(true)}
        >
          <div className="w-10 h-10 text-sm border border-gray-400 rounded-full font-semibold bg-white flex items-center justify-center">
            {getAvatarFallback(comments[comments.length - 1].name)}
          </div>
          <p className="w-fit max-w-60vw truncate">
            {comments[comments.length - 1].content}
          </p>
        </div>
      ) : (
        <p
          className="w-full text-gray-500 font-semibold mb-4 cursor-pointer"
          onClick={() => setCommentModalIsOpen(true)}
        >
          댓글
        </p>
      )}
      <div className="flex gap-2 w-full">
        {files.map((file, index) => (
          <div key={index} className="flex gap-2 items-center bg-gray-100 rounded-full p-2">
            <Paperclip size={16} />
            <p className="max-w-24 truncate">{file.name}</p>
          </div>
        ))}
        <div className="flex gap-2 items-center mb-4 text-gray-500 font-semibold cursor-pointer">
          <input
            type="file"
            multiple
            onChange={handleAddFile}
            id="file-input"
            className="hidden"
          />
          <label htmlFor="file-input" className="flex gap-2 items-center cursor-pointer">
            <p className="w-fit">파일 추가</p>
            <Plus size={16} />
          </label>
        </div>
      </div>
      <DetailModal
        title="담당자 수정"
        isOpen={detailModalIsOpen}
        setIsOpen={setDetailModalIsOpen}
      >
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
            }}
          >
            <div className="relative">
              <Label className="text-sm font-medium">담당자</Label>
              <Input
                id="manager"
                placeholder="담당자를 입력하세요"
                className="rounded-sm my-2"
                value={member}
                onChange={(e) => {
                  setMember(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addMember();
                  }
                }}
              />
              {member.length > 0 && (
                <div
                  className="absolute top-[69px] left-0 right-0 flex items-center justify-between bg-gray-100 p-2 cursor-pointer z-10"
                  onClick={addMember}
                >
                  {member}
                  <Plus size={16} className="!w-4 !h-4" />
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
                        onClick={() => setMembers(members.filter((m) => m !== member))}
                      />
                    </Badge>
                  ))
                }
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-primary-500 text-white disabled:bg-gray-400"
              >
                저장
              </Button>
            </div>
          </form>
        </Form>
      </DetailModal>
      <DetailModal
        title="댓글"
        isOpen={commentModalIsOpen}
        setIsOpen={setCommentModalIsOpen}
        contentClassName="max-w-3xl"
      >
        <div className="flex flex-col gap-8 w-full py-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex gap-4 items-center justify-between"
            >
              <div className="flex flex-1 gap-4 items-center">
                <div className="w-10 h-10 text-sm border border-gray-400 rounded-full font-semibold bg-white flex items-center justify-center">
                  {getAvatarFallback(comment.name)}
                </div>
                {editCommentId === comment.id ? (
                  <Input
                    type="text"
                    value={editCommentContent}
                    onChange={(e) => setEditCommentContent(e.target.value)}
                    className="flex-1 text-base"
                  />
                ) : (
                  <p className="w-fit max-w-60vw truncate">
                    {comment.content}
                  </p>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <p className="w-fit text-gray-500 text-sm">
                  {moment(comment.createdAt).format("YYYY-MM-DD HH:mm")}
                </p>
                <Button onClick={() => {
                  if (editCommentId === comment.id) {
                    handleEditCommentId(comment.id);
                  } else {
                    onEditComment(comment.id);
                  }
                }}>
                  {editCommentId === comment.id ? "저장" : "수정"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 w-full">
          <Input
            type="text"
            placeholder="댓글"
            className="w-full bg-gray-50 shadow-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="ghost"
            className="rounded-full bg-primary-500 text-white size-9"
            onClick={handleComment}
          >
            <ArrowUp size={24} className="!size-5" />
          </Button>
        </div>
      </DetailModal>
      <div id="editor" className="w-full bg-gray-50 rounded-3xl px-8 py-4" />
      <Button
        className="fixed bottom-4 right-4"
        onClick={handleSave}
      >
        저장
      </Button>
    </div>
  );
}
