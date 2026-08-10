import path from "path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import AppError from "./AppError.js";

export let fileParser = async (buffer, originalName) =>{
    let extension = path.extname(originalName).toLowerCase();

    if(extension == ".pdf")
    {
        let parser = new PDFParse({
            data: buffer
        });
        let result = await parser.getText();
        console.log("result anushka" ,result);
        return result.text.trim();
    }

    if(extension == ".docx")
    {
        let { value } = await mammoth.extractRawText({buffer});
        console.log(value);
        return value.trim();
    }

    if(extension == ".txt")
    {
        let data = buffer.toString("utf-8").trim();
        return data;
    }

    throw new AppError("Unsupported file type. Please upload a PDF, DOCX, or TXT resume.", 400);
}