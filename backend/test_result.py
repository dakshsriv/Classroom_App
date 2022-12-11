# Automatically generated by Pynguin.
import pytest
import main as module_0
import platform as module_1


@pytest.mark.xfail(strict=True)
def test_case_0():
    none_type_0 = None
    module_0.delete_classroom(none_type_0, none_type_0)


def test_case_1():
    bool_0 = True
    var_0 = module_0.login(bool_0, bool_0)
    assert module_0.origins == [
        "http://localhost:3000/",
        "http://127.0.0.1:3000/",
        "http://192.168.0.28:3000/https://localhost:3000/",
        "localhost",
    ]


def test_case_2():
    var_0 = module_0.start_db()
    assert module_0.origins == [
        "http://localhost:3000/",
        "http://127.0.0.1:3000/",
        "http://192.168.0.28:3000/https://localhost:3000/",
        "localhost",
    ]


@pytest.mark.xfail(strict=True)
def test_case_3():
    none_type_0 = None
    var_0 = module_0.login(none_type_0, none_type_0)
    assert module_0.origins == [
        "http://localhost:3000/",
        "http://127.0.0.1:3000/",
        "http://192.168.0.28:3000/https://localhost:3000/",
        "localhost",
    ]
    var_1 = module_0.get_all_classrooms(var_0)
    var_2 = module_0.get_classes(none_type_0, none_type_0)
    module_0.delete_classroom(none_type_0, var_0)


@pytest.mark.xfail(strict=True)
def test_case_4():
    none_type_0 = None
    var_0 = module_0.get_people(none_type_0, none_type_0)
    assert module_0.origins == [
        "http://localhost:3000/",
        "http://127.0.0.1:3000/",
        "http://192.168.0.28:3000/https://localhost:3000/",
        "localhost",
    ]
    var_1 = module_0.login(none_type_0, var_0)
    module_0.register(var_1, none_type_0)


@pytest.mark.xfail(strict=True)
def test_case_5():
    none_type_0 = None
    var_0 = module_0.login(none_type_0, none_type_0)
    assert module_0.origins == [
        "http://localhost:3000/",
        "http://127.0.0.1:3000/",
        "http://192.168.0.28:3000/https://localhost:3000/",
        "localhost",
    ]
    var_1 = module_0.get_classes(none_type_0, none_type_0)
    module_0.delete_classroom(none_type_0, var_0)


@pytest.mark.xfail(strict=True)
def test_case_6():
    var_0 = module_1.mac_ver()
    var_1 = module_1.release()
    module_0.status(var_0, var_0)


@pytest.mark.xfail(strict=True)
def test_case_7():
    var_0 = module_1.system()
    module_0.register(var_0, var_0)


@pytest.mark.xfail(strict=True)
def test_case_8():
    var_0 = module_1.system()
    var_1 = module_0.get_classrooms(var_0, var_0)
    assert module_0.origins == [
        "http://localhost:3000/",
        "http://127.0.0.1:3000/",
        "http://192.168.0.28:3000/https://localhost:3000/",
        "localhost",
    ]
    var_2 = module_0.login(var_0, var_0)
    module_0.register(var_0, var_0)
