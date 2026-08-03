# Integrate a chat view

- we want to have a more complex interactivity with the website to retain users
- we know there is a simple AI chat intregration with cloudflare, durable objects and the ai verser SDK
- we need to reeplace the ai generated block of text to something that feels more engagig with the chat mode
- the basic idea is to use the cv and website info as context for the llm running the chat so anyone can just ask very specific questions without having to read all the experience

constraints:
- keep cost low, the llama model we have now is a good starting point
