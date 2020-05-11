using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Text;
using MediaToolkit;
using MediaToolkit.Model;
using MediaToolkit.Options;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DAL
{
    public static class DALManager
    {
        #region MongoDB

        private static MongoClient dbClient = new MongoClient("mongodb://localhost:27017/ArtList");
        public static string Save(string fileName, string toName, string toType)
        {
            var videos = dbClient.GetDatabase("videos");
            var collection = videos.GetCollection<BsonDocument>(toType);
            var id = collection.EstimatedDocumentCount();

            var videoInfo = new BsonDocument
            {
                {"id",id.ToString()},
                {"FileFrom" ,fileName},
                {"toName" ,toName},
                {"toType" ,toType},
                {"ZipPath" , Directory.GetCurrentDirectory() + "\\Videos\\" + toType + "\\Results\\"+ id + "\\" + toName + ".zip"},
            };

            collection.InsertOne(videoInfo);

            return id.ToString();
        }

        #endregion

        #region Files functions
        public static void CopyFile(IFormFile file, string fileName, string filePath)
        {
            using (var stream = System.IO.File.Create(filePath + "\\" + fileName))
            {
                file.CopyTo(stream);
            }
        }

        public static void BuildZipFile(string fileName, string newName, string tempZipPath, string filePath, string zipPath)
        {
            File.Delete(filePath + "\\" + fileName);
            ZipFile.CreateFromDirectory(filePath, tempZipPath);
            DirectoryInfo di = new DirectoryInfo(filePath);

            foreach (FileInfo file in di.GetFiles())
            {
                file.Delete();
            }

            di.Delete();

            File.Copy(tempZipPath, zipPath + "\\" + newName + ".zip");
            File.Delete(tempZipPath);
        }

        public static string createDirectory(string type, string innerFolder)
        {
            string path = Directory.GetCurrentDirectory() + "\\Videos\\" + type;

            if (!File.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            Directory.CreateDirectory(path + "\\" + innerFolder);

            return path + "\\" + innerFolder;
        } 
        #endregion


        #region Convert Functions

        public static void ConvertHls(MediaFile inputFile, MediaFile outputFile, string filePath, string name)
        {
            outputFile.Filename = filePath + "\\" + name + ".m3u8";

            using (var engine = new Engine())
            {
                engine.Convert(inputFile, outputFile);
            }
        }

        public static void ConvertThumbnails(MediaFile inputFile, MediaFile outputFile, string filePath, string name)
        {
            using (var engine = new Engine())
            {
                outputFile.Filename = filePath + "\\" + "One" + name + ".jpg";
                var optionsOneMiliSec = new ConversionOptions { Seek = TimeSpan.FromMilliseconds(1000) };
                engine.GetThumbnail(inputFile, outputFile, optionsOneMiliSec);

                outputFile.Filename = filePath + "\\" + "Three" + name + ".jpg";
                var optionsThirdMiliSec = new ConversionOptions { Seek = TimeSpan.FromMilliseconds(3000) };
                engine.GetThumbnail(inputFile, outputFile, optionsThirdMiliSec);
            }
        }

        public static void ConvertH264Files(MediaFile inputFile, MediaFile outputFile, string filePath, string name)
        {
            outputFile.Filename = filePath + "\\" + name + ".h264";

            using (var engine = new Engine())
            {
                engine.Convert(inputFile, outputFile);
            }

        }

        #endregion
    }
}
