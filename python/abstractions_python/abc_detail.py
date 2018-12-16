"""python 에서 Abstraction 을 적용하기 위해 abc 모듈이 필요

NOTE: pycharm 을 이용하여 개발 (IDE 는 중요하지 않음)

classmethod 는 builtin 에 소속된 타입이다.
"""

from abc import ABC, abstractmethod


class Person:
    age = 25

    def print_age(cls):
        print('The age is:', cls.age)


# create printAge class method
Person.print_age = classmethod(Person.print_age)

Person.print_age()

p = Person()
p.print_age()

"""
class PlatformFactory:

    @classmethod
    def 
"""




class BaseObject(ABC):
    """BaseObject 는 ABC 클래스를 상속한다.
    """

    @classmethod
    @abstractmethod
    def _get_name(self):
        raise NotImplemented()

    @abstractmethod
    def __set_name__(self, owner, name):
        raise NotImplemented()

    name = property()
    # abstractclassmethod 는 3.3 이후로 deprecated 되었다.
    # 대신, classmethod 를 사용하라고 안내한다.
    # @abc.abstractclassmethod

    # property 로 대체
    # @abc.abstractproperty

    # staticmethod 로 대체
    # @abc.abstractstaticmethod