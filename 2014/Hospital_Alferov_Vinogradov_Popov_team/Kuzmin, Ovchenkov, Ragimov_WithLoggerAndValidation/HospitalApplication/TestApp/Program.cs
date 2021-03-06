﻿using System;
using System.Collections.Generic;
using HospitalLib.Data;
using HospitalLib.Providers;

namespace TestApp
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var person = new Person("имя", "фамилия", "отчество", new DateTime(1666, 12, 12));
            var provider = new PersonProvider(new DatabaseProvider());
            IList<Person> persons = provider.Load();

            provider.Save(ref person);
            persons = provider.Load();

            person.FirstName = "Другое имя";
            provider.Update(person);
            persons = provider.Load();

            provider.Remove(person);
            persons = provider.Load();
            // String strConnString = ConfigurationManager.ConnectionStrings["conString"].ConnectionString;
            //   SqlConnection con = new SqlConnection(strConnString);
        }
    }
}