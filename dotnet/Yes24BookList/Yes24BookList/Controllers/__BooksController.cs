using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Yes24BookList.Models;

namespace Yes24BookList.Controllers
{
    public class __BooksController : Controller
    {

        private readonly ApplicationDbContext _db;
        public __BooksController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View(_db.Books.ToList());
        }

        /// <summary>
        /// DBContext 를 Dispose 하기 위해 Controller 의 Dispose 메서드를 오버라이드(재정의) 한다.
        /// </summary>
        /// <param name="disposing"></param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                _db.Dispose();
        }
    }
}