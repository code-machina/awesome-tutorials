using NUnit.Framework;
namespace Tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test_Static_Count_Increment()
        {
            // 정적 변수로 선언된 count 변수를 서로 다른 인스턴스에서 공유하는지 테스트
            // 결론: 2

            var jnl = new DeePattern.SOLID.SRP.Violation.Journal();
            var jnl2 = new DeePattern.SOLID.SRP.Violation.Journal();

            jnl.Increment();
            jnl.Increment();
            
            Assert.AreEqual(2, jnl2.Count);
        }

        [Test]
        public void Test_Persistence_SaveToCsvFile()
        {
            // Journal 클래스를 생성하고 이를 Persistence 객체를 통해 파일로 출력
            var jnl = new DeePattern.SLID.SRP.Correctness.Journal();
            jnl.AddEntry("Entry 1");
            jnl.AddEntry("Entry 2");
            jnl.AddEntry("Entry 3");
            jnl.AddEntry("Entry 4");
            jnl.AddEntry("Entry 5");

            var per = new DeePattern.SLID.SRP.Correctness.Persistence();

            per.SaveToCsvFile(jnl, @"C:\ProgramData\test.csv", true);

        }
    }
}