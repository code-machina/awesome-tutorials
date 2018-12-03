"""Text Formatted Table : Tabular

usage: 

from tabular import Tabular

tb = Tabular()
tb.header = ["name", "no", "age", "etc."]
tb.append_row(['Jhons Hopkins', '161844', '12', 'Freshmen Student'])
tb.append_row(['Jhons Hopkins', '161844', '12', 'Freshmen Student'])
tb.append_row(['Jhons Hopkins', '161844', '12', 'Freshmen Student'])

print(tb.render())

"""

__author__ = "gbkim1988"


make_column = lambda x,y : "!:^{0}@".format(x).replace('!', '{').replace('@','}').format(y)
make_row = lambda arr1, arr2: "|" + "|".join([make_column(x, y) for x, y in zip(arr1, arr2)]) + "|"
make_bound = lambda x, y, z: x*y + x*(z+1)

class HeaderKeyError(Exception):
    """Tabular has a confliction of same header name
    """
    pass

class Tabular(object):
    def __init__(self):
        # self._head = head if isinstance(head, list) else list()
        # self._row = row if isinstance(row, list) else list()
        self._row = []
        self._head = []
        # self._width = max(row, key=len) if len(row) != 0 else 0
        self._wdth = dict()
        """
        Structure of _wdth
        self._wdth = {
            "Name" : 10,
            "Age" : 11,
            "Etc" : 22
        }
        """

    def __update_width(self):
        for row in self._row:
            if not isinstance(row, list):
                break
            for h, r in zip(self._head, row):
                if h in self._wdth:
                    self._wdth[h] = max(self._wdth[h], len(h), len(r))
                else:
                    self._wdth[h] = max(len(h), len(r))
        
        return self._wdth.values()

    def header(self, head=[]):
        self._head = head

    def append_row(self, row=[]):
        # lngth = max(row, key=len) if len(row) != 0 else 0
        # self._width = max(len(lngth), self._width)
        self._row.append(row)

    def __template(self):
        """Sample
        ---------------------------
        | Name |  Age  |    Etc   |
        ---------------------------
        | Kim  |  16   |  Student |
        ---------------------------
        """

        chunk = "|`:^{0}`|"

        pass

    def render(self, alpha=2):
        # update header length
        import os
        self.__update_width()
        text_return = lambda x: x + os.linesep
        col_width = []

        for h in self._head:
            col_width.append(self._wdth[h] + alpha*2)
        
        arr = col_width
        total_length = sum(arr)
        column_length = len(self._head)
        text = ""
        text += text_return(make_bound("-", total_length, column_length))
        text += text_return(make_row(arr, self._head))
        for row in self._row:
            if isinstance(row, list):
                text += text_return(make_bound("-", total_length, column_length))
                text += text_return(make_row(arr, row))
        text += text_return(make_bound("-", total_length, column_length))

        return text

def test_case_1_make_tabular_text():
    tb = Tabular()

    tb.header(["Name", "Age", "Status"])
    tb.append_row(["kim", "12", "College Student (Freshman)"])
    tb.append_row(["kim gun bum", "12", "College Student (Freshman)"])
    tb.append_row(["", "1212121212121212121212", "Dummy"])

    print(tb.render())

    print(tb._wdth)

    pass

def test():
    test_case_1_make_tabular_text()

if __name__ == "__main__":
    test()