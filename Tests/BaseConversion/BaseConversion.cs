namespace Tests.MultiplyBy
{
    using System.Collections.Generic;
    using System.Linq;
    using CSharp.Codewars;
    using FSharp.CodeWars;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class BaseConversionFsTests
    {
        [TestMethod]
        public void LetterChangeFs_JavaScript()
        {
            Assert.AreEqual("320048", BaseConversionFs.convert(BaseConversionFs.alphaLower, BaseConversionFs.hex, "hello"));
        }

      //convert dec bin "15"   `shouldBe` "1111"
      //convert dec oct "15"   `shouldBe` "17"
      //convert bin dec "1010" `shouldBe` "10"
      //convert bin hex "1010" `shouldBe` "a"
      
      //convert dec alpha      "0"     `shouldBe` "a"
      //convert dec alphaLower "27"    `shouldBe` "bb"
      //convert alphaLower hex "hello" `shouldBe` "320048"
    }

    [TestClass]
    public class BaseConversionCsTests
    {
        //[TestMethod]
        //public void LetterChangeCs_JavaScript()
        //{
        //    Assert.AreEqual("KbwbTdsjqu", LetterChangeCs.LetterChange("JavaScript"));
        //}
    }
}