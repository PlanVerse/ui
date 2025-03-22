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
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page({ token }) {
  const ejInstance = useRef(null);
  const [editorData, setEditorData] = useState(null);
  const [title, setTitle] = useState("");
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(undefined);

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
                  const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editor/upload/99`, {
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

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4">
      <Input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 border-none text-2xl font-bold p-0 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center gap-4 w-full mb-4">
        <div className="relative">
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
        <Select>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="진행 단계" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="접수">
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
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4 w-full mb-4">
        <p className="w-full text-gray-500 font-semibold">
          담당자
        </p>
        <Button variant="ghost" className="p-0 rounded-none w-9">
          <Settings size={24} className="!w-6 !h-6" />
        </Button>
      </div>
      <div id="editor" className="w-full" />
    </div>
  );
}
