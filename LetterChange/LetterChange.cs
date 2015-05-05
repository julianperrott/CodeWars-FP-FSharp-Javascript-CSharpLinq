namespace Tests.MultiplyBy
{
    using System.Collections.Generic;
    using System.Linq;
    using CSharp.Codewars;
    using FSharp.CodeWars;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class LetterChangeFsTests
    {
        [TestMethod]
        public void LetterChangeFs_JavaScript()
        {
            Assert.AreEqual("KbwbTdsjqu", LetterChangeFs.letterChange("JavaScript"));
        }

        [TestMethod]
        public void LetterChangeFs_LoremIpsum()
        {
            Assert.AreEqual("Mpsfn Jqtvn", LetterChangeFs.letterChange("Lorem Ipsum"));
        }

        [TestMethod]
        public void LetterChangeFs_CornerZ_A()
        {
            Assert.AreEqual("A", LetterChangeFs.letterChange("Z"));
        }

        [TestMethod]
        public void LetterChangeFs_Cornerz_a()
        {
            Assert.AreEqual("A", LetterChangeFs.letterChange("Z"));
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