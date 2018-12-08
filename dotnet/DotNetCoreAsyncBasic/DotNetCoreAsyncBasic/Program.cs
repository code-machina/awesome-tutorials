using System;
using System.Threading.Tasks;
using System.Timers;
using static System.Console;

namespace DotNetCoreAsyncBasic
{
    class Content
    {
        public async Task<string> WaitForTwoSecsAsync()
        {
            await Task.Delay(2000);
            return "WaitForTwoSecsAsync";
        }
        public async Task<string> WaitForThreeSecsAsync()
        {
            await Task.Delay(3000);
            return "WaitForThreeSecsAsync";
        }

        public async Task<string> WaitForFiveSecsAsync()
        {
            await Task.Delay(5000);
            return "WaitForFiveSecsAsync";
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            // Console.WriteLine("Hello World!");
            WriteLine();
            var content = new Content();

            var five = content.WaitForFiveSecsAsync();
            var two = content.WaitForTwoSecsAsync();
            var three = content.WaitForThreeSecsAsync();

            /* Console 은 동기이기 때문에 While 루프를 쓰지 않는 이상 비동기 메서드의 결과를 완료 시간 순서대로 받을 수 없다.
             * */
            
            int count = 0;
            bool bTwo = false;
            bool bThree = false;
            bool bFive = false;
            bool bTwoCnt = false;
            bool bThreCnt = false;
            bool bFiveCnt = false;

            var watch = System.Diagnostics.Stopwatch.StartNew();
            
            var elapsedMs = watch.ElapsedMilliseconds;
            while (true)
            {
                if (five.IsCompleted && !bFive)
                    WriteLine($"{ five.Result } {++count} {bFive = true}");
                if (two.IsCompleted && !bTwo)
                    WriteLine($"{ two.Result } {++count} {bTwo = true}");
                if (three.IsCompleted && !bThree)
                    WriteLine($"{ three.Result } {++count} {bThree = true}");

                if (bTwo && !bTwoCnt)
                    WriteLine($"{ watch.ElapsedMilliseconds} seconds {bTwoCnt = true}");
                if (bThree && !bThreCnt)
                    WriteLine($"{ watch.ElapsedMilliseconds} seconds {bThreCnt = true}");
                if (bFive && !bFiveCnt)
                    WriteLine($"{ watch.ElapsedMilliseconds} seconds {bFiveCnt = true}");

                if (count == 3)
                    break;

              
            }
            // the code that you want to measure comes here
            watch.Stop();

            /* Ouput :
             *  
             *  
             *  WaitForTwoSecsAsync
             *  WaitForThreeSecsAsync
             *  WaitForFiveSecsAsync
             * */

        }
    }
}
