import { NextRequest } from "next/server";
import { OpenAI } from "openai";
import { TextContentBlock } from "openai/resources/beta/threads/index.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const assistent_id = "asst_UpaEWYwVPGVSnHFY54GY3Dr2";

async function waitForResult(runId: string, threadId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    async function verifyStatus() {
      try {
        // Verificar estado del run
        // https://platform.openai.com/docs/api-reference/runs/getRun?lang=node.js
        const currentRun = await openai.beta.threads.runs.retrieve(runId, {
          thread_id: threadId,
        });
        console.log("Run status:", currentRun.status);

        if (currentRun.status === "completed") {
          console.log(currentRun);
          resolve();
        } else if (currentRun.status === "failed") {
          reject(new Error("Run failed"));
        } else {
          // Esperar y volver a verificar
          console.log(currentRun.status);
          setTimeout(verifyStatus, 1000);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }
    verifyStatus();
  });
}

export async function GET(request: NextRequest) {
  let result = "";
  const params = request.nextUrl.searchParams;
  const textToSearch = params.get("search");

  if (!textToSearch) {
    return Response.json({ data: "Error: No search text provided." });
  }

  try {
    // Recibir un asistente
    // https://platform.openai.com/docs/api-reference/assistants/getAssistant?lang=node.js
    const assistent = await openai.beta.assistants.retrieve(assistent_id);
    console.log("Assistant created:", assistent.id);

    // Creamos un hilo de conversación
    // https://platform.openai.com/docs/api-reference/threads/createThread?lang=node.js
    const thread = await openai.beta.threads.create();
    console.log("Conversation created:", thread.id);

    // Enviar un mensaje al asistente dentro del hilo de conversación
    // https://platform.openai.com/docs/api-reference/messages/createMessage?lang=node.js
    const messages = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: textToSearch,
    });
    console.log("Message sent:", messages.id);

    // Obtener respuestas del asistente
    // https://platform.openai.com/docs/api-reference/runs/createRun?lang=node.js
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistent.id,
    });
    console.log("Run created:", run.id);

    await waitForResult(run.id, thread.id);

    const responseMessage = await openai.beta.threads.messages.list(thread.id);
    responseMessage.data.forEach((message) => {
      if (message.role === "assistant") {
        const content: TextContentBlock[] =
          message.content as TextContentBlock[];
        result = content[0]["text"].value;
        console.log("Assistant message:", result);
      }
    });
  } catch (error) {
    console.error("Error creating assistant:", error);
  }

  return Response.json({ data: result });
}
