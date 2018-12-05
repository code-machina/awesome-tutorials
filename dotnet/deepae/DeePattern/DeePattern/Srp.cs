using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

/* srp : Single Responsiblity Principle
 * 단일 책임의 원칙으로 불리는 이 원칙은 하나의 클래스가 하나 이상의 책임(Responsiblity)를 내포할 때 발생하는 
 * 변경의 어려움을 지적하는 원칙이다. 만약에 두개 이상의 책임이 한 클래스에 부여되어 있다면 변경을 고려해 보아야 한다.
 */

/* 시나리오
 * 개발자 K 는 Journal(일기)를 보관하는 컨테이너 클래스를 만들었다.
 * 이 클래스는 문자열 데이터를 리스트에 보관하고 이를 파일로 출력 및 
 * 읽어들이는 역할을 한다.
 * 
 * 문제 인식
 * 즉, Persistence(출력/입력) 과 Container 의 역할 두 가지를 수행한다.
 * 
 * 따라서, 다음의 문제가 발생한다. 
 * 
 * 상황
 * 
 * 개발자 K의 상급자는 다음과 같은 문제를 인식하고 해결을 촉구한다.
 * 저장되는 파일이 텍스트인 것은 좋으나 파일의 형식이 CSV, XML 과 같은 
 * Formatted Type 이었으면 한다.
 * 
 * 문제 현상(Bad Smell)
 * 
 * Journal 클래스에서 계속 수정이 발생한다. 모든 것을 충족시키기 어렵다.
 * 코드가 길어지기 시작한다. 개발자 K 는 코드를 분할 하고 싶어한다.
 * 
 */

namespace DeePattern.SOLID.SRP.Violation
{
    public class Journal
    {
        /* 데이터 베이스로 부터 사용자가 작성한 일기 데이터를 불러온다.
         * entries 멤버
         * > private (-)로 지정하며 List<string> Generic Collection 타입이다.
         * > readonly 를 부여하며 필드(Field)선언을 통해서 할당한다.
         * > 생성자는 암시적(Implicit) 기본 생성자를 사용한다. 
         */

        private readonly List<string> entries = new List<string>();
        // 정적 변수는 Journal 클래스와 함께 동작한다. 
        // 즉, 여러 개의 인스턴스가 static count 를 증가시 키는 경우 
        private static int count = 0;

        public int Count
        {
            get
            {
                return count;
            }
        }

        public int Increment()
        {
            return ++count;
        }

        public int AddEntry(string text)
        {
            entries.Add($"{++count}: {text}");
            return count;
        }

        /* VIOLATION : 단일 책임 원칙 위반 */
        public void Save(string filename, bool overwrite = false)
            => File.WriteAllText(filename, ToString());

        /* BAD SMELL 
         * 
         * BOSS: Text 파일이 아닌 CSV 파일로 저장해라.
         */
        public void SaveCsv(string filename, bool overwrite = false)
        {
            List<string> pruned = new List<string>();

            foreach (var e in this.entries)
            {
                var text = e.Split(":").GetValue(2);
                if ( text.GetType() == typeof(string) )
                {
                    pruned.Add((string)text);
                }
                else
                {
                    throw new InvalidOperationException(
                        message: "적절하지 않은 타입이 검출됨", 
                        innerException: new ArgumentNullException(
                            paramName: nameof(text), 
                            message: $"적절하지 않은 {nameof(text)} 변수가 사용됨"));
                }
            }

            File.WriteAllText(filename, string.Join(
                separator: Environment.NewLine,
                values: pruned));
        }

        /* BAD SMELL
         * 
         * BOSS: CSV 는 이제 구식이니 XML 포맷의 파일로 전송해라....
         */
        public void SaveXml(string filename, bool overwrite = false)
        {
            // ........
            // 더 이상 수정하면 ... 안될 것 같은데....
        }
        
        /// <summary>
        /// ToString 을 override 하여 텍스트 출력 시 다음과 같은 호출을 유도한다.
        /// ex. File.WriteAllText(filename, ToString());
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return string.Join(
                separator: Environment.NewLine,
                values: entries);
        }
    }
}

namespace DeePattern.SLID.SRP.Correctness
{
    /* 해결
     * 
     * 개발자 K 는 SRP (Single Responsiblity Principle)에 따라 클래스를 두개로 나누었다.
     * 데이터를 보관하는 컨테이너 클래스와 파일 입/출력을 담당하는 Persistence 클래스이다.
     * 
     * 
     */
    public class Journal
    {
        private readonly Dictionary<int, string> entries = new Dictionary<int, string>();
        private static int count = 0;

        public int Count
        {
            get { return count; }
        }

        public Dictionary<int, string> Entries
        {
            get { return entries; }
        }

        public int AddEntry(string text)
        {
            entries.Add(++count, text);
            return count;
        }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();

            foreach (KeyValuePair<int, string> kvp in entries)
            {
                sb.Append($"Key = {kvp.Key}, Value = {kvp.Value}");
            }
            return sb.ToString();
        }
    }

    /// <summary>
    /// Journal 클래스를 파일로 출력
    /// </summary>
    /// <para>
    /// Usage: Journal 클래스와 함께 사용한다.
    /// </para>
    /// <example>
    /// <code>
    /// var jnl = new Journal();
    /// var p = new Persistence();
    /// p.SaveToFile(jnl, @"/tmp/entries.txt")
    /// </code>
    /// </example>
    ///
    public class Persistence
    {
        /// <summary>
        /// Journal 클래스 엔트리를 텍스트 파일로 출력
        /// </summary>
        /// <example>
        /// <code>
        /// var jnl = new Journal();
        /// var p = new Persistence();
        /// p.SaveToFile(jnl, @"/tmp/entries.txt")    
        /// </code>
        /// </example>
        /// <exception cref="System.AccessViolationException">Thrown when .... </exception>
        /// <param name="journal"></param>
        /// <param name="filename">DeePattern.SLID.SRP.Correctness.Journal</param>
        /// <param name="overwrite"></param>
        public void SaveToFile(DeePattern.SLID.SRP.Correctness.Journal journal,
            string filename, 
            bool overwrite = false)
        {
            if (overwrite || !File.Exists(filename))
                File.WriteAllText(filename, journal.ToString());
        }

        /// <summary>
        /// Journal 클래스의 엔트리를 CSV 파일로 출력
        /// </summary>
        /// <param name="journal"></param>
        /// <param name="filename"></param>
        /// <param name="overwrite"></param>
        public void SaveToCsvFile(DeePattern.SLID.SRP.Correctness.Journal journal,
            string filename, 
            bool overwrite = false)
        {

            StringBuilder sb = new StringBuilder();

            foreach (KeyValuePair<int, string> kvp in journal.Entries)
            {
                sb.Append($"{kvp.Key}, {kvp.Value}{Environment.NewLine}");
            }
            if (overwrite || !File.Exists(filename))
                File.WriteAllText(filename, sb.ToString());
        }

    }
}
