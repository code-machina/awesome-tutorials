"""의존성 역전 원칙(Dependency Inversion Principle)을 구현

Audit Layer 는 감사 규칙을 정의하고 이를 준수하는지 체크한다.
AuditPrivilegeService 는 Audit Privilege Layer 를 사용하도록 한다.


Python 스타일의 구현

ASP.NET MVC 패턴을 보면 Controller 의 Route Annotation(Decorator) 을 통해 효율적으로 의미를 메서드 내에 함축하는 것을 알 수 있다.
이를 응용하면 AuditPolicy 를 정의하면서 효율적인 구현이 가능하다.

@NotUser('windows.groups.administrator')
@Path(NginxRootPath)
def check_rwx_privilege(self, User, Path):

    '''Business Logic
    '''
    User. .....

    Path. .....

    return {
        'read': True,
        'write': False,
        'execute': True
    }

"""

import abc

"""Python 의 특성상 맨 위에서 정의한 클래스의 정의는 맨 아래의 동일한 클래스 정의에 의해서 덮어씌워진다.
이를 통해 전방선언이 가능하다. 

class Path:
    pass

class Path:
    ......
"""


class Path:
    pass


class User:
    pass


""" Audit Package
"""


class Reason:
    """Reason 객체는 Violation 혹은 Well-Defined 등 의 상태를 기술하기 위한 객체이다.


    """
    pass


class Audit:
    """Audit 객체는 감사를 수행하고 이에 대한 결과(Reason)을 리턴한다.
    Usage:
        audit = Audit()
    """

    # @User()
    # @Path()
    def check_privilege_violation(self):
        """권한을 체크한다.

        :return:
        """
        self.Path = Path()
        self.User = User()

        aps = ConcretePrivilegeService()
        aps.get_privilege_by_user(self.Path, self.User)
        pass
    pass



class Rule:
    pass


class IAuditPrivilegeService(object, metaclass=abc.ABCMeta):
    """AuditPrivilegeService 는 Privilege 레이어가 준수해야 할 인터페이스 구현을 정의한다.

    AuditPrivilegeService should declare an interface that Privilege layer must implement.

    interface 와 같은 contract(계약)관계를 정의하기 위해 abc.ABCMeta 클래스를 상속한다.

    """

    @abc.abstractmethod
    def get_privilege_by_user(self, path: Path, user: User) -> dict:
        """

        :param path: Path 객체의 인스턴스
        :param user: User 객체의 인스턴스
        :return:
        """
        return dict(
            read=True,
            write=True,
            execute=True
        )

    @abc.abstractmethod
    def must_be_implemented(self):
        pass






"""Privilege Layer

Privilege 레이어는 하위 레이어로 OS 에 독립적인 파일, 사용자의 권한을 체크한다.
OS 에 종속적인 파일 권한 체크 로직을 숨기는 역할을 한다.

"""


"""File Privilege

해커가 파일 시스템에 대한 쉘 권한을 획득하였다고 하였을 때, 특정 권한에 대해 중요 파일은 읽을 수 없도록 하여야 한다.
When hacker get a shell privilege on your OS, hacker can't read an important file. 
When hacker pawned your system, hacker couldn't read an important file.
시스템 보안 강화(System Security Hardening) 관점에서 파일의 권한 감지를 위해서 권한을 나타내는 방법을 추상화 할 필요가 있다.
In regarding to hardening security of system, We need to make a privilege abstract to notice a status of file privilege.  

대상: 임의의 파일의 경로
tomcat 데몬의 실행 권한을 가진 사용자가

추상 팩토리 패턴을 이용해서 OS에 맞는 FilePrivilege 객체를 생성한다. 

"""


class FilePrivilege(object):
    """
    """
    pass


class ConcretePrivilegeService(IAuditPrivilegeService):

    def get_privilege_by_user(self, path: Path, user: User):
        return True

    def must_be_implemented(self):
        pass
    pass


"""Path Utility Layer

OS 독립적인 Path 를 구현하기 위해 이를 추상화한다.

"""


class Path:
    pass


"""User Utility Layer

OS 독립적인 User 를 구현하기 위해 이를 추상화한다.
"""


if __name__ == "__main__":
    Audit().check_privilege_violation()