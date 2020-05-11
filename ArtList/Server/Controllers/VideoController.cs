using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using BL;
using MediaToolkit;
using MediaToolkit.Model;
using MediaToolkit.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NReco.VideoConverter;
using NuGet.Common;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    public class VideoController : Controller
    {
        [HttpPost]
        [Route("api/Video/createFile")]
        public async Task<IActionResult> Post(IFormCollection newFileValues)
        {
            string outPutFileName = BLManager.Convert(newFileValues);

            var memory = new MemoryStream();

            using (var stream = new FileStream(outPutFileName, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }


            memory.Position = 0;
            return File(memory, "application/zip", Path.GetFileName(outPutFileName));
        }
    }
}
