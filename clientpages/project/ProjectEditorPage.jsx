"use client";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import EditorjsList from "@editorjs/list";
// import SimpleImage from "@editorjs/simple-image";
import { useEffect, useRef } from "react";

export default function ProjectEditorPage({ token }) {
  const DEFAULT_INITIAL_DATA =  {
    "time": new Date().getTime(),
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": "This is my awesome editor!",
          "level": 1
        }
      },
    ]
  }

  const ejInstance = useRef(null);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      data: DEFAULT_INITIAL_DATA,
      tools: {
        header: Header,
        linkTool: {
          class: LinkTool,
          config: {
            
          },
        },
        image: {
          class: ImageTool,
          config: {
            // uploader: {
            //   async upload(file) {
            //     const formData = new FormData();
            //     formData.append("image", file);

            //     const response = await fetch("http://localhost:3005/api/uploadimage", {
            //       method: "POST",
            //       headers: {
            //         "Content-Type": "multipart/form-data"
            //       },
            //       body: formData
            //     })

            //     const data = await response.json();
            //     if (data.success === 1) {
            //       return response.data;
            //     }
            //   },
            //   async uploadByUrl(url) {
            //     const response = await fetch("http://localhost:3005/api/uploadbyurl", {
            //       method: "POST",
            //       headers: {
            //         "Content-Type": "application/json"
            //       },
            //       body: JSON.stringify({ url })
            //     })

            //     const data = await response.json();
            //     if (data.success === 1) {
            //       return data;
            //     }
            //   }
            // }
            endpoints: {
              byFile: "http://localhost:3005/api/uploadimage",
              byUrl: "http://localhost:3005/api/upload"
            }
          }
        },
        // image: SimpleImage,
        list: {
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered"
          }
        }
      },
      onChange: async () => {
        let content = await editor.saver.save();

        console.log(content);
      }
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
