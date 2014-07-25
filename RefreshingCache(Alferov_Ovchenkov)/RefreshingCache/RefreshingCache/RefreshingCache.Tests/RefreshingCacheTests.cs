﻿using System;
using System.Globalization;
using Xunit;

namespace RefreshingCache.Tests
{
    public class RefreshingCacheTests
    {
        private const int CacheSize = 16;
        private const int Lifetime = 1000;
        private const int TimeMoreThanMax = 1001;

        private class Computer : IComputer<int, string>
        {
            public string LastData { get; private set; }
            public string GetData(int key)
            {
                LastData = key.ToString(CultureInfo.InvariantCulture);
                return LastData;
            }
        }

        private class Time : ITime
        {
            public long CurrentTime { get; set; }
        }

        [Fact]
        public void RefreshingCacheIndexer_SimpleIntegerValue_ShouldPass()
        {
            var systemTime = new Time();
            var cache = new RefreshingCache<int, string>(CacheSize, Lifetime, new Computer(), systemTime);
            var actual = cache[0];

            Assert.Equal("0", actual);
        }

        [Fact]
        public void RefreshingCacheIndexer_WhenTimeIsUp_ShouldPass()
        {
            var systemTime = new Time();
            var computer = new Computer();
            
            string temp;
            var cache = new RefreshingCache<int, string>(CacheSize, Lifetime, computer, systemTime);

            for (int i = 0; i < 16; ++i)
            {
                ++systemTime.CurrentTime;
                temp = cache[i];
            }

            systemTime.CurrentTime = TimeMoreThanMax;
           
            //we add new data with key "17". It replaces data with key "0" because our time expired. 
            temp = cache[17];
            
            //And when we try get data with key "0", cache gets it from computer, because it was deleted early.
            temp = cache[0];

            Assert.Equal("0", computer.LastData);
        }

        [Fact]
        public void RefreshingCacheIndexer_WhenCacheSizeIncreaseUpperMaxSize_ShouldPass()
        {
            var systemTime = new Time();

            var cache = new RefreshingCache<int, string>(CacheSize, Lifetime, new Computer(), systemTime);
            for (int i = 0; i < 20; ++i)
            {
                ++systemTime.CurrentTime;
                var temp = cache[i];
            }

            Assert.Equal(CacheSize, cache.Count);
        }

        [Fact]
        public void RefreshingCache_NullReferenceInIComputerParam_ArgumentNullExceptionThrown()
        {
            Assert.Throws(typeof(ArgumentNullException), () =>
            {
                Computer computer = null;
                new RefreshingCache<int, string>(CacheSize, Lifetime, computer, new Time());
            });
        }

        [Fact]
        public void RefreshingCache_NullReferenceInITimeParam_ArgumentNullExceptionThrown()
        {
            Assert.Throws(typeof(ArgumentNullException), () =>
            {
                Time time = null;
                new RefreshingCache<int, string>(CacheSize, Lifetime, new Computer(), time);
            });
        }
    }
}
