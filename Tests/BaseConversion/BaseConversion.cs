namespace Tests.MultiplyBy
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Numerics;
    using CSharp.Codewars;
    using FSharp.CodeWars;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class BaseConversionFsTests
    {
        [TestMethod]
        public void BaseConversionFs_alphaLowerToHex()
        {
            Assert.AreEqual("320048", BaseConversionFs.convert(BaseConversionFs.alphaLower, BaseConversionFs.hex, "hello"));
        }

        [TestMethod]
        public void BaseConversionFs_DecToBin()
        {
            Assert.AreEqual("1111", BaseConversionFs.convert(BaseConversionFs.dec, BaseConversionFs.bin, "15"));
        }

        [TestMethod]
        public void BaseConversionFs_DecToOct()
        {
            Assert.AreEqual("17", BaseConversionFs.convert(BaseConversionFs.dec, BaseConversionFs.oct, "15"));
        }

        [TestMethod]
        public void BaseConversionFs_BinToDec()
        {
            Assert.AreEqual("10", BaseConversionFs.convert(BaseConversionFs.bin, BaseConversionFs.dec, "1010"));
        }

        [TestMethod]
        public void BaseConversionFs_BinToHex()
        {
            Assert.AreEqual("a", BaseConversionFs.convert(BaseConversionFs.bin, BaseConversionFs.hex, "1010"));
        }

        [TestMethod]
        public void BaseConversionFs_DecToAlpha()
        {
            Assert.AreEqual("a", BaseConversionFs.convert(BaseConversionFs.dec, BaseConversionFs.alpha, "0"));
        }

        [TestMethod]
        public void BaseConversionFs_DecToAlphaLower()
        {
            Assert.AreEqual("bb", BaseConversionFs.convert(BaseConversionFs.dec, BaseConversionFs.alphaLower, "27"));
        }

        [TestMethod]
        public void BaseConversionFs_RevertAlphaToAlphaNumeric()
        {
            string value = "EaCfEvxNcbScvR";
            char[] from = BaseConversionFs.alpha;
            char[] to = BaseConversionFs.alphaNumeric;

            Assert.AreEqual(value,BaseConversionFs.convert(to,from, BaseConversionFs.convert(from, to, value)));
        }

        [TestMethod]
        public void BaseConversionFs_StartsWithZero()
        {
            Assert.AreEqual("67452446421742473557475641125703753", BaseConversionFs.convert(BaseConversionFs.dec, BaseConversionFs.dec, "067452446421742473557475641125703753"));
        }
    }

    [TestClass]
    public class BaseConversionCsTests
    {
        [TestMethod]
        public void BaseConversionCs_ToDecimal_alphaLowerToDec()
        {
            Assert.AreEqual(3276872, BaseConversionCs.toDecimal(BaseConversionCs.alphaLower, "hello"));
        }

        [TestMethod]
        public void BaseConversionCs_ToDecimal_alphaLower()
        {
            Assert.AreEqual(BigInteger.Parse("609979409672590158309775"), BaseConversionCs.toDecimal(BaseConversionCs.alpha, "EaCfEvxNcbScvR"));
        }

        [TestMethod]
        public void BaseConversionCs_ToBase16()
        {
            Assert.AreEqual("8,4,0,0,2,3", string.Join(",",BaseConversionCs.ToBase(16,3276872)));
        }

        [TestMethod]
        public void BaseConversionCs_alphaLowerToHex()
        {
            Assert.AreEqual("320048", BaseConversionCs.convert(BaseConversionCs.alphaLower, BaseConversionCs.hex, "hello"));
        }

        [TestMethod]
        public void BaseConversionCs_DecToBin()
        {
            Assert.AreEqual("1111", BaseConversionCs.convert(BaseConversionCs.dec, BaseConversionCs.bin, "15"));
        }

        [TestMethod]
        public void BaseConversionCs_DecToOct()
        {
            Assert.AreEqual("17", BaseConversionCs.convert(BaseConversionCs.dec, BaseConversionCs.oct, "15"));
        }

        [TestMethod]
        public void BaseConversionCs_BinToDec()
        {
            Assert.AreEqual("10", BaseConversionCs.convert(BaseConversionCs.bin, BaseConversionCs.dec, "1010"));
        }

        [TestMethod]
        public void BaseConversionCs_BinToHex()
        {
            Assert.AreEqual("a", BaseConversionCs.convert(BaseConversionCs.bin, BaseConversionCs.hex, "1010"));
        }

        [TestMethod]
        public void BaseConversionCs_DecToAlpha()
        {
            Assert.AreEqual("a", BaseConversionCs.convert(BaseConversionCs.dec, BaseConversionCs.alpha, "0"));
        }

        [TestMethod]
        public void BaseConversionCs_DecToAlphaLower()
        {
            Assert.AreEqual("bb", BaseConversionCs.convert(BaseConversionCs.dec, BaseConversionCs.alphaLower, "27"));
        }

        [TestMethod]
        public void BaseConversionCs_RevertAlphaToAlphaNumeric()
        {
            string value = "EaCfEvxNcbScvR";
            char[] from = BaseConversionCs.alpha;
            char[] to = BaseConversionCs.alphaNumeric;

            Assert.AreEqual(value, BaseConversionCs.convert(to, from, BaseConversionCs.convert(from, to, value)));
        }

        [TestMethod]
        public void BaseConversionCs_StartsWithZero()
        {
            Assert.AreEqual("67452446421742473557475641125703753", BaseConversionCs.convert(BaseConversionCs.dec, BaseConversionCs.dec, "067452446421742473557475641125703753"));
        }
    }
}