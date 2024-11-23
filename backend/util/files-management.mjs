import { join } from "path";
import { unlink, access } from "fs/promises";
import { constants } from "fs";

export async function deleteFile(filePath) {
  try {
    const absolutePath = join(process.cwd(), filePath);
    await access(absolutePath, constants.F_OK); //Check if file exists

    await unlink(absolutePath); //Deletes file if one exists
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(`File not found: ${filePath}`);
    }
    throw new Error(`Got an error trying to delete the file: ${err.message}`);
  }

  return true;
}
