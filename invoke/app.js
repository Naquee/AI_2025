
import readline from "node:readline/promises";
import Groq from "groq-sdk";
import {tavily} from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY});
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main(){
    const rl = readline.createInterface({input:process.stdin, output:process.stdout});
     const messages= [
        {
            role:"system",
            content:`You are smart personal assistant who answer the asked questions
            you have access to following tools:
            1. searchWeb({query} : {query:string}) // Search the latest information and realtime data on the internate.
            current datetime: ${new Date().toUTCString()}
            `

        },
        // {
        //     role:"user",
        //     content: " what is current weather in Patna",
        //     // what current weather in Mumbai

        // }
    ]

    while(true){

        const question = await rl.question('You:')
        // bye
        if(question === 'bye'){
            break;
        }
        messages.push({
            role:"user",
            content:question
        
    })




        while(true){
      const completions = await groq.chat.completions.create({
    temperature:0,
    // top_p:0.2,
    // stop:11,
    // stop:Na,  // Negative
 // max_completion_tokens:1000, // use for less token and price control
// frequency_penalty:1 ,// range -2 to 2 to prevent the repeated,
// presence_penalty:1,
// response_format:{type:"json_object"},

    model:"llama-3.3-70b-versatile",
    messages:messages,
    tools:[
            {
      type: "function",
      function: {
        name: "webSearch",
        description: "Search the latest information and realtime data on the internate.",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The search query to perform search on.",
            },
           
          },
          required: ["query"]
        }
      }
    }
    ],
    tool_choice:"auto",

   })

   messages.push(completions.choices[0].message)

   const toolCalls = completions.choices[0].message.tool_calls;
   if(!toolCalls){
    console.log(`Assistant: ${completions.choices[0].message.content}`);
    break;
   }

   for(const tool of toolCalls) {
    console.log("tool", tool)
    const functionName= tool.function.name;
    const functionParams = tool.function.arguments;
    if(functionName === "webSearch"){
        const toolResult = await webSearch(JSON.parse(functionParams));
        // console.log("Tool Result:",toolResult)
        messages.push({
            tool_call_id:tool.id,
            role:'tool',
            name:functionName,
            content:toolResult
        })
    }
   }
}
}

rl.close();

//    console.log("completions",JSON.stringify(completions.choices[0].message,null,2))
    
}

main();


async function webSearch({query}){
    console.log("web search .......")
    const response = await tvly.search(query)
    // console.log("response", response)
    const finalResult = response.results.map((result) => result.content).join("\n\n")
    // console.log("finalResult", finalResult)

    // we will do tavily api call
    return finalResult

}