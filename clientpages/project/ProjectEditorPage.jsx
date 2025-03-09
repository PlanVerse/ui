"use client";

import { useEffect, useRef } from "react";
import { getApi, postApi } from "@/lib/axios";
import { getSession } from "@/lib/session";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
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

export default function Page() {
  const ejInstance = useRef(null);

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
                const token = await getSession();

                const bodyData = await new FormData();
                bodyData.append("file", file);

                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                };

                return await postApi(`${process.env.NEXT_PUBLIC_API_URL}/editor/upload/99`, bodyData, config).then(async (uploadResponse) => {
                  const config = {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  };

                  const fetchResponse = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/${uploadResponse.file.url}`, null, config);
                  uploadResponse.preview = fetchResponse.file.preview;

                  return uploadResponse;
                });
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

      data: {
        blocks: [
          {
            id: "9802bjaAA2",
            type: "image",
            data: {
              caption: "",
              withBorder: true,
              withBackground: false,
              stretched: false,
              file: {
                url: "editor/99/88c4a389-6685-4064-9dce-cb50477b8c25",
                // todo 하단 객체로 랜더링 되도록 해야함
                preview: "https://s.pstatic.net/static/www/mobile/edit/20240112_1095/upload_1705057885416AaxUM.png",
              },
            },
          },
        ],
      },

      onReady: () => {
        ejInstance.current = editor;
      },

      onChange: async (api, event) => {
        let content = await editor.saver.save();

        console.log(content);
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
    <>
      <div>
        <div id="editor" />
      </div>
    </>
  );
}
