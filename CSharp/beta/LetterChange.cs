﻿/* http://www.codewars.com/kata/5530b10808541c24330000b4/train/haskell

Welcome to this Kata. In this Kata you will be given a string. Your task is to replace every character with the letter following it in the alphabet 
(for example, "b" should be "c", "z" should be "a" and capital "Z" should be "A").

The test cases would not have any special symbols or numbers but it will have spaces. And the upper and lower cases should be retained in your output.

For Example:

letterChange "Lorem Ipsum" `shouldBe` "Mpsfn Jqtvn"
*)
*/

namespace CSharp.Codewars
{
    using System.Linq;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    public partial class LetterChangeCs
    {
        public static string LetterChange(string str)
        {
            return new String(str.ToCharArray()
                .Select(s => NextChar(s))
                .ToArray());
        }

        private static char NextChar(char c)
        {
            switch (c)
            {
                case 'Z': return 'A';
                case 'z': return 'a';
                case ' ': return ' ';
                default: return (char)((int)c + 1);
            }
        }
    }


    [TestClass]
    public class LetterChangeCsTests
    {
        [TestMethod]
        public void LetterChangeCs_JavaScript()
        {
            Assert.AreEqual("KbwbTdsjqu", LetterChangeCs.LetterChange("JavaScript"));
        }

        [TestMethod]
        public void LetterChangeCs_LoremIpsum()
        {
            Assert.AreEqual("Mpsfn Jqtvn", LetterChangeCs.LetterChange("Lorem Ipsum"));
        }

        [TestMethod]
        public void LetterChangeCs_CornerZ_A()
        {
            Assert.AreEqual("A", LetterChangeCs.LetterChange("Z"));
        }

        [TestMethod]
        public void LetterChangeCs_Cornerz_a()
        {
            Assert.AreEqual("A", LetterChangeCs.LetterChange("Z"));
        }
    }
}