"use client";

import { getApi, postApi } from "@/lib/axios";
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
import Paragraph from "@editorjs/paragraph";

import { useEffect, useRef } from "react";

export default function ProjectEditorPage({ token }) {
  const ejInstance = useRef(null);

  const initEditor = () => {
    const editor = new EditorJS({
      readOnly: false,
      holder: "editorjs",
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
            endpoints: {
              byFile: 'http://localhost:50051/api/v1/editor/upload'
            },
            field: "file",
          },
          uploader: {
            uploadByFile(file) {
              return postApi(`${process.env.NEXT_PUBLIC_API_URL}/editor/upload`).then(response => {
                return {
                  success: 122,
                  file: {
                    url: response.file,
                  },
                };
              })
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
      defaultBlock: 'paragraph',
      placeholder: "Write something or press / to select a tool",
      autofocus: true,
      // data: {
      //   blocks: [
      //     {
      //       id: "zcKCF1S7X8",
      //       type: "header",
      //       data: {
      //         text: "Editor.js",
      //         level: 1,
      //       },
      //     },
      //     {
      //       id: "9802bjaAA2",
      //       type: "image",
      //       data: {
      //         caption: "",
      //         withBorder: true,
      //         withBackground: false,
      //         stretched: false,
      //         file: {
      //           url: "editor/99/a3e16d3e-e99e-4ce2-90d6-1ff4b2f6d2ed",
      //         },
      //       },
      //     },
      //   ],
      // },

      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async (_api, _event) => {
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
    <div>
      <div id="editorjs" />
    </div>
  );
}
