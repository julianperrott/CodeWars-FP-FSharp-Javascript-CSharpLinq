/* http://www.codewars.com/kata/51c8991dee245d7ddf00000e/train/haskell
Complete the solution so that it reverses all of the words within the string passed in.

Example:

reverseWords "The greatest victory is that which requires no battle"
-- should return "battle no requires which that is victory greatest The"
*/

namespace CSharp.Codewars
{
    using System.Linq;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    public partial class ReverseWordsCs
    {
        public static string reverseWords(string words)
        {
            return System.String.Join(" ", words.Split(' ').Reverse());
        }
    }

    [TestClass]
    public class ReverseWordsCsTests
    {
        [TestMethod]
        public void ReverseWordsCs_Hello()
        {
            Assert.AreEqual("world! hello", ReverseWordsCs.reverseWords("hello world!"));
        }

        [TestMethod]
        public void ReverseWordsCs_Yoda()
        {
            Assert.AreEqual("this like speak doesn't yoda", ReverseWordsCs.reverseWords("yoda doesn't speak like this"));
        }

        [TestMethod]
        public void ReverseWordsCs_Foobar()
        {
            Assert.AreEqual("foobar", ReverseWordsCs.reverseWords("foobar"));
        }
        [TestMethod]
        public void ReverseWordsCs_Row()
        {
            Assert.AreEqual("boat your row row row", ReverseWordsCs.reverseWords("row row row your boat"));
        }
    }
}
