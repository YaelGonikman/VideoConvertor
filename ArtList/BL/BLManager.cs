using DAL;
using MediaToolkit;
using MediaToolkit.Model;
using MediaToolkit.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public static class BLManager
    {
        public static string Convert(IFormCollection newFileValues)
        {
            string type = newFileValues["type"];
            string name = newFileValues["name"];
            string fileName = newFileValues.Files[0].FileName;

            if (newFileValues.Files[0].Length > 0)
            {
                string id = DALManager.Save(fileName, name, type);


                string tempZipPath = Directory.GetCurrentDirectory() + "\\Videos\\" + type + "\\" + name + ".zip";
                string filePath = DALManager.createDirectory(type, id);
                string zipPath = DALManager.createDirectory(type + "\\Resluts", id);

                DALManager.CopyFile(newFileValues.Files[0], fileName, filePath);
                 
                var inputFile = new MediaFile() { Filename = filePath + "\\" + fileName };
                var outputFile = new MediaFile();

                switch (type)
                {
                    case "H264":
                        DALManager.ConvertH264Files(inputFile, outputFile, filePath, name);

                        break;
                    case "Thumbnail":
                        DALManager.ConvertThumbnails(inputFile, outputFile, filePath, name);

                        break;
                    case "HLS":
                        DALManager.ConvertHls(inputFile, outputFile, filePath, name);
                        break;
                    default:
                        break;
                }

                DALManager.BuildZipFile(fileName, name, tempZipPath, filePath, zipPath);

                return zipPath + "\\" + name + ".zip";
            }

            return null;
        }
      
    }
}