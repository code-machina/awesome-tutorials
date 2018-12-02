using System;

namespace interface_segregation_principle
{
    public class Document
    {

    }

    public interface IMachine{
        void Print(Document d);
        void Scan(Document d);
        void Fax(Document d);
    }

    public class MultiFunctionPrinter : IMachine
    {
        public void Print(Document d)
        {
            // 
        }

        public void Scan(Document d){
            // 
        }

        public void Fax(Document d){
            // 
        }
    }

    public class OldFashionPrinter : IMachine
    {
        public void Print(Document d)
        {
            // 
        }

        public void Scan(Document d){
            throw new NotImplementedException();
        }

        public void Fax(Document d){
            throw new NotImplementedException();
        }
    }

    public interface IPrinter{
        void Print(Document d);
    }

    public interface IScanner{
        void Scan(Document d);
    }

    public class Photocopier : IPrinter, IScanner  // ...
    {
        public void Print(Document d){

        }

        public void Scan(Document d){

        }
    }

    public interface IMultiFunctionalDevice : IScanner, IPrinter
    {}

    public class MultiFunctionMachine : IMultiFunctionalDevice
    {
        private IPrinter printer;
        private IScanner scanner;

        public MultiFunctionMachine(IPrinter printer, IScanner scanner)
        {
            this.printer = printer ?? throw new ArgumentNullException(paramName:nameof(printer));
            this.scanner = scanner ?? throw new ArgumentNullException(paramName:nameof(scanner));
        }

        public void Print(Document d)
        {
            printer.Print(d);
        }

        public void Scan(Document d)
        {
            scanner.Scan(d);
            // Decorator pattern
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
