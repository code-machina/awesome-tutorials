using System;
using System.Collections.Generic;

namespace decorator_pattern
{
    /* 동적으로 기능을 추가하기 위한 decorator 패턴 활용 방법 */

    /* 시나리오: 비행기 시뮬레이션 게임의 공격 기능(상하좌우)를 수정하는 방법 */
    public enum Direction{
        Front, // 정방 공격 
        Side, // 측면 공격 <= () => 
        Rear // 후면 공격
    }

    public class Item
    {
        private Direction direction;
        public Item(Direction dir){
            if(dir == null)
                throw new ArgumentNullException(paramName:nameof(dir));
            this.direction = dir;
        }
        
        public Direction GetDirection(){
            return direction;
        }
    }

    public class Airplane
    {
        public Airplane(){}
        public void AddItem(Item item)
        {
            if (!Items.Contains(item.GetDirection()))
            {
                Items.Add(item.GetDirection());
            }else{
                // Don't do anything.
                // because its duplicate
            }
        }

        public void Attack(){
            // How to check one of items has a Direction.Rear
            if (Items.Exists((i) => i == Direction.Rear)) {
                Console.WriteLine("Rear Attack");
            }

            if (Items.Exists((i) => i == Direction.Side)) {
                Console.WriteLine("Side Attack");
            }

            // Default Front attack
            Console.WriteLine("Front Attack");
        }

        private List<Direction> Items = new List<Direction>{Direction.Front}; // Default, Airplane can attack at the front
    }

    class Program
    {
        static void Main(string[] args)
        {
            var plane = new Airplane();
            plane.AddItem(new Item(Direction.Rear));
            plane.AddItem(new Item(Direction.Side));
            plane.Attack();
        }
    }
}
