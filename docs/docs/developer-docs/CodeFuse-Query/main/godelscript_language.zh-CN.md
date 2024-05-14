---
store:
  title: CodeFuse-Query
  version: main
group:
  title: 🌱 CodeFuse-Query
  order: -1
title: 查询语言介绍
order: 2
toc: content
---

# GödelScript 查询语言

## 目录

- [GödelScript 基本概念和语法](#gödelscript-基本概念和语法)
  - [简介](#简介)
  - [基本程序构成](#基本程序构成)
  - [基础类型和编译器内建函数](#基础类型和编译器内建函数)
  - [函数](#函数)
  - [语句](#语句)
  - [Schema](#schema)
  - [数据库](#数据库)
  - [Trait](#trait)
  - [Import](#import)
  - [Query](#query)
  - [Ungrounded Error: 未赋值/未绑定错误](#ungrounded-error-未赋值未绑定错误)
- [查询示例](#查询示例)
  - [Java](#java)
  - [Python](#python)
  - [JavaScript](#javascript)
  - [XML](#xml)
  - [Go](#go)
- [查询调试和优化技巧](#查询调试和优化技巧)
  - [Schema 传参导致笛卡尔积过大](#schema-传参导致笛卡尔积过大)
  - [多层 for 导致笛卡尔积过大](#多层-for-导致笛卡尔积过大)
  - [不要滥用`@inline`](#不要滥用inline必须用inline的优化策略)
- [在本机使用查询脚本流程](#在本机使用查询脚本流程)

## GödelScript 基本概念和语法

### 简介

```rust
// script
fn hello(greeting: string) -> bool {
    return greeting = "hello world!"
}

fn main() {
    output(hello())
}
```

GödelScript 即 Gödel 查询语言。GödelScript 是 CodeQuery 用于查询和数据处理的领域专用语言 (DSL)。GödelScript 使用了类 Rust 的语法，提供了严格的类型检查、方便快捷的类型推导、智能友好的错误提示信息，使用户能够快速上手。

GödelScript 编译器主要应用场景为：

1. 面向用户编写简单或复杂查询，提供更便捷的写法，提高编写查询的效率；
2. 提供严格类型检查与类型推导，给予更智能的代码修改提示；
3. 提供严格的 [ungrounded(未赋值/未绑定)](#ungrounded-error-未赋值未绑定错误) 检测，避免触发 Soufflé Ungrounded Error；
4. Language Server 以及 IDE Extension 支持。

### 基本程序构成

#### 程序结构

GödelScript 程序可能包含:

- [模块和符号引用](#import)
- [Schema 类型声明](#schema)
- [数据库类型声明](#数据库)
- [Trait 声明](#trait)
- [Schema 方法实现](#方法实现)
- [函数声明和实现](#函数)
- [Query 声明](#query)

包含以上所有组成内容的样例:

```rust
// script
// 包引入/符号引入
use coref::java::* // 引入所有符号
use coref::java::{JavaDB, Class} // 选择性引入符号

// 函数声明
fn default_db() -> JavaDB {
    return JavaDB::load("example.db")
}

// schema 声明
schema File {
    @primary id: int
}

// database 声明
database NewDB {
    file: *File
}

// trait 声明
trait FileTrait {
    fn getId(self) -> int;
}

// impl trait for
impl FileTrait for File {
    fn getId(self) -> int {
        return self.id
    }
}

// impl
impl File {
    @data_constraint
    fn all() -> *File {
        yield File {id: 1}
        yield File {id: 2}
    }
}

// query
query get_all_anno from
    Annotation anno in Annotation(default_db())
select
    anno.id as id
```

#### 注释

GödelScript 采用类 C 语言的注释方式。

```rust
// 单行注释

/*
* 1. 多行注释
* 2. 多行注释
*/
```

#### `main` 函数

GödelScript 查询脚本可以包含`main`函数，该函数无返回值。在不实现`main`函数，且没有写 query 声明的情况下，程序不会输出。

更多详细内容请看 [main 函数](#gödelscript-main-函数)。

```rust
fn main() {
    output(query_1())
    output(query_2())
}
```

### 基础类型和编译器内建函数

GödelScript 包含基础类型`int` `string`，`bool`属于基础类型，但是不能作为值存储。

#### `int`类型 native 函数

| 函数 | 类型 | 解释 |
| --- | --- | --- |
| pow | (int, int) -> int | 乘方。参数只能非负数。 |
| rem | (int, int) -> int | 取余。 |
| bitand | (int, int) -> int | 按位与。 |
| bitor | (int, int) -> int | 按位或。 |
| bitxor | (int, int) -> int | 按位异或。 |
| bitnot | (int) -> int | 按位非。 |
| neg | (int) -> int | 算术取反。 |
| to_string | (int) -> string | 转换为字符串。 |
| add | (int, int) -> int | + |
| sub | (int, int) -> int | - |
| mul | (int, int) -> int | * |
| div | (int, int) -> int | / |
| eq | (int, int) -> bool | = |
| ne | (int, int) -> bool | != |
| gt | (int, int) -> bool | > |
| ge | (int, int) -> bool | >= |
| lt | (int, int) -> bool | < |
| le | (int, int) -> bool | <= |
| to_set | (int) -> *int | 转为集合类型。 |

#### `string`类型 native 函数

| 函数 | 类型 | 解释 |
| --- | --- | --- |
| len | (string) -> int | 获取字符串长度。 |
| substr | (string, int, int) -> string | 通过初始index和length来截取字符串。 |
| contains | (string, string) -> bool | 判断一个字符串是否被包含在当前字符串中。 |
| matches | (string, string) -> bool | 判断正则字符串是否完全匹配当前字符串。 |
| get_regex_match_result | (string, string, int) -> string | 获取被正则字符串完全匹配当前字符串时的某一个捕获结果，该结果由第二个参数（int）确定。如 "abcdef".get_regex_match_result("a(.*)f", 1) 的结果是 "bcde"。 |
| to_int | (string) -> int | 转换为整数。 |
| add | (string, string) -> string | 字符串拼接。 |
| eq | (string, string) -> bool | 判断字符串相等。 |
| ne | (string, string) -> bool | 判断字符串不相等。 |
| to_set | (string) -> *string | 转为集合类型。 |

#### `bool`类型 native 函数

`bool`虽然作为基础类型存在，但是该类型不能作为数据参与中间计算，只能作为条件结果。

| 函数 | 类型 | 解释 |
| --- | --- | --- |
| not | (bool) -> bool | 条件取反。 |
| and | (bool, bool) -> bool | 条件与。 |
| or | (bool, bool) -> bool | 条件或。 |
| eq | (bool, bool) -> bool | 相等。 |
| ne | (bool, bool) -> bool | 不相等。 |

#### 作用于集合的 native 函数

| 函数 | 类型 | 解释 |
| --- | --- | --- |
| len | (*T) -> int | 获取数据集合的数量。 |
| max | (*int) -> int | 查找最大值。 |
| min | (*int) -> int | 查找最小值。 |
| sum | (*int) -> int | 求和。 |
| find | (*T0) -> T1 | 从一个集合中，通过主键查找数据。 |

#### 全局 native 函数

| 函数 | 类型 | 解释 |
| --- | --- | --- |
| output | ((...) -> bool) -> <null-type> | 输出 query 内容。 |

#### database 的 native 函数

| 函数 | 类型 | 解释 |
| --- | --- | --- |
| load | (string) -> T | 加载 database 。 |

#### schema 的 native 函数

| 函数 | 类型 | 解释 |
| --- | --- | --- |
| to&lt;T&gt; | (self) -> T | 转换到其他类型的 schema，采用 duck type 检测。 |
| is&lt;T&gt; | (self) -> bool | 判断是否可以是其他类型的 schema，采用 duck type 检测。如果自身 schema 有主键，则底层只会通过主键判断是否可以是其他类型。 |
| key_eq | (self, T) -> bool | 检查两个 schema 实例的主键是否相等。 |
| key_neq | (self, T) -> bool | 检查两个 schema 实例的主键是否不等。 |

schema native 函数实例：

```rust
use coref::java::*

fn default_java_db() -> JavaDB {
    return JavaDB::load("coref_java_src.db")
}

fn example() -> bool {
    for(stmt in StatementParent(default_java_db())) {
        if (stmt.is<ElementParent>()) {
            return true
        }
    }
}

fn convert() -> *ElementParent {
    for(stmt in StatementParent(default_java_db())) {
        yield stmt.to<ElementParent>()
    }
}
```

### 函数

#### GödelScript `main` 函数

`main`函数是 GödelScript 中唯一不声明返回值的函数。`main`函数只允许使用`output`，其他语句会导致编译错误；多次使用`output(...)`可以输出多个查询结果，查询结果会分表显示，表名即为`output`中调用的查询函数的函数名。

#### 查询函数

查询函数的返回值类型推荐为`bool`，需要输出查询结果时，需要使用`output()`函数。

在`output()`中调用的查询函数不再是常规思路中的用传参调用函数。参数列表在此时会变化为输出表的表结构，下面是两个查询函数的应用实例：

1. 单表`output`

    单表`output`特指在`main`函数中，只使用一次`output`来输出。

    ```rust
    fn example(a: int, b: string) -> bool {...}

    fn main() {
        output(example()) // 此时参数列表变为输出表结构，不需要传参
    }
    ```

    对应的输出表结构为:

    ```json
    [
        {"a": 0, "b": "xxx"},
        {"a": 1, "b": "xxx"}
    ]
    ```

2. 多表`output`

    多表`output`是指在`main`函数中，使用多次`output`来输出。在这种情况下，输出数据会附带对应的表名。

    ```rust
    fn example0(a: int, b: string) -> bool {...}
    fn example1(a: string, b: int) -> bool {...}

    fn main() {
        output(example0())
        output(example1())
    }
    ```

    对应的输出表结构为:

    ```json
    {
        "example0":[
            {"a": 0, "b": "xxx"},
            {"a": 1, "b": "xxx"}
        ],
        "example1":[
            {"a": "xxx", "b": 0},
            {"a": "xxx", "b": 1}
        ]
    }
    ```

下面是一个比较详细的例子，在这个例子中，我们直接构造了两组数据并输出。在下列代码中，需要注意的是：

1. GödelScript 中，布尔值可以使用`true`和`false`关键字。

2. `=`符号在 GödelScript 中是比较特殊的符号，不能用常规的编程语言的思路来理解。GödelScript 是一种 Datalog 语言。在这里，`=`符号同时具备两种语义，一个是 __赋值__ 一个是 __判等__。详情可看[`=`运算符](#赋值和判等运算符)。

3. 在这个例子的条件语句中，`a`和`b`均使用了`=`的赋值语义，因为`int`和`string`类型参数在函数体中被认为是`ungrounded(未赋值/未绑定)`，必须要被赋值才能使用。

4. `=`赋值语句的返回值是`true`。

```rust
fn example(a: int, b: string) -> bool {
    // = 符号同时具有赋值和比较的功能，取决于此时的左值是否已经“被赋值”
    // 这里的 a 和 b 所用的 = 符号均是赋值语义
    if (a = 1 && b = "1") {
        // GödelScript 使用关键字 true 和 false 来表示布尔值
        return true
    }
    if (a = 2 && b = "2") {
        return true
    }
}

fn main() {
    output(example())
}
```

预期的输出结果应该为：

```json
[
    {"a": 1, "b": "1"},
    {"a": 2, "b": "2"}
]
```

#### 普通函数

普通函数用于封装一些复杂过程，这些函数必须要有明确的返回类型。
其中返回类型可以存在两种情况:

1. 单个返回值，箭头后面声明返回值类型。

```rust
fn getFile(c: Class) -> File {
    return c.getRelativePath()
}
```

2. 返回集合，箭头后面的返回值类型前需要加上`*`以表明其返回的是一个集合。

```rust
fn getAllFiles(db: JavaDB) -> *File {
    for (f: File in File(db)) {
        yield f
    }
}
```

一般情况下要求单返回值使用`return`语句，而多返回值/返回集合使用`yield`语句。
实际使用中，由于 GödelScript 底层使用 Datalog 引擎，故任何的运算都是基于集合的，单返回值实际上仅仅意味着返回的集合可能只包含一个数据，但是也可能包含多个数据。

### 语句

#### for 语句：从集合中声明变量

GödelScript 使用`for`关键字和类似循环语句的语法来从集合中声明变量：

```rust
for(f: File in getAllFiles()) {
    ...
}
```

其中`f: File`，冒号后面跟着的是`f`的类型，可省略。
`for`语句中允许直接定义多个变量，后面定义的变量在初始化时可使用同一语句中在它前面定义的所有变量:

```rust
for(a in XmlAttribute(db), b in XmlAttribute(db), c in XmlElement(db)) {
    ...
}

for(a in getAllFiles(), b in a.getAllPaths()) {
    ...
}
```

#### let 语句：声明单一变量

GödelScript 使用 `let`关键字来声明一个单一/中间变量：

```rust
let(f: File = c.getRelativePath()) {
    ...
}
```

其中`f: File`，冒号后面的类型可省略。
`let`语句中允许直接定义多个变量，后面定义的变量在初始化时可使用同一语句中在它前面定义的所有变量:

```rust
let(a = 1, b = a + 1, c = b + 1) {
    ...
}
```

#### if 语句

GödelScript 的条件语句与许多过程式程序语言类似：

```rust
if (f.getName().contains("util") || f.getName().contains("com")) {
    ...
}
```

条件可以使用这些逻辑运算符进行连接：`!`取反，`||`或，`&&`与。

条件中的比较运算符：`>`大于，`<`小于，`>=`大于等于，`<=`小于等于，`=`等于或者赋值，`!=`不等于。

常规算术运算可以使用如下运算符：`+`加法，`-`减法/取负，`*`乘法，`/`除法。

##### 赋值和判等运算符`=`

`=`符号在 GödelScript 中具有两种不同的语义：赋值和判等，具体的语义需要分情况进行讨论:

1. 赋值

    赋值一般出现在`int` `string`这类基础类型的变量参数上，这类变量作为函数的参数出现时，一般被认为是未赋值的。而具有这类变量的函数被调用时，传入的参数，实际上是作为筛选条件存在。

    ```rust
    fn example(a: int) -> bool {
        // 这里比较反直觉，在过程式语言中，这里通常会被认为是判断 a == 1
        // 但是在 datalog 方言中，datalog 的每个函数实际上都是在算一个中间表 (view)
        // 所以这个函数本质上是生成了一个 view，数据为 [{"a": 1}]
        return a = 1 // assign a = 1
    }

    fn test() -> bool {
        // 这里看似是在通过传参让 a = 2，实际上并不是
        // example() 自己会返回 view: [{"a": 1}]
        // 然后通过 a = 2 来约束结果，可以看到，我们这里没有拿到任何结果
        // 所以返回了 false
        return example(2) // false
    }
    ```

2. 判等

    对于 schema 类型来说，任何一个 schema 背后都有一个全集，所以参数列表中的 schema 类型一般被认为是已经被赋值的。对于已经赋值的变量来说，`=`就是判等操作。

    ```rust
    // 声明 schema
    schema A {...}

    // 实现 schema 的成员函数
    impl A {
        // 这里定义了 schema A 的全集
        @data_constraint
        pub fn __all__() -> *A {...}
    }

    fn example(a: A) -> bool {
        for(temp in A::__all__()) {
            if (a = temp) {
                return true
            }
        }
    }
    ```

    同样，对于中间声明的有初始值的`int`或者`string`，`=`也是判等操作。

    ```rust
    fn example() -> bool {
        let (a = 1) { // assign a = 1
            if (a = 1) { // compare a = 1
                return true
            }
        }
    }
    ```

#### match 语句

GödelScript 允许对`int`和`string`类型编写 match 语句，match 语句是类似 switch 的多条件分支语句，match 的条件必须为字面量:

```rust
match(a) {
    1 => return 0,
    2 => return 1,
    3 => if (a + 1 < 10) {
        return 10
    }
}
```

#### 返回语句

GödelScript 使用`return`和`yield`。`return`用于单个返回值的函数，`yield`用于集合的返回。

```rust
fn a() -> int {
    return 0
}

fn b() -> *int {
    yield 1
    yield 2
    yield 3
}
```

### Schema

Schema 是 GödelScript 中的复杂数据表的结构。

#### 结构声明

GödelScript 使用`schema`关键字来声明一个表结构:

```rust
schema File {
    id: int,
    name: string
}
```

如果某个字段在数据库中是作为主键存在的，可以使用`@primary`注解来表明其为主键:

```rust
schema File {
    @primary id: int,
    name: string
}
```

**有主键的表结构会使得查询速度得到显著提升，所以尽量绑定一个主键，主键应尽量为**`**int**`**类型。**

#### 方法实现

GödelScript 使用如下方式来声明和实现`schema`的相关方法：

```rust
impl File {
    // 静态方法
    fn f1() -> ... {...}
    // 成员方法，第一个参数必须为 self
    fn f2(self) -> ... {...}
    ...
}
```
##### 静态方法

静态方法不需要`self`作为第一个参数，使用方式很简单，`类名::方法名(...)`。

```rust
impl File {
    fn getSchemaName() -> string {
        return "File"
    }
}

fn out(t: string) -> bool {
    if (t = File::getSchemaName()) {
        return true
    }
}
```

##### 成员方法

成员方法的第一个参数必须为`self`，该参数无需写明类型。这类函数的调用方式是`实例名.函数名(...)`。

```rust
impl File {
    fn getName(self) -> string {
        return self.name
    }
}

fn out(path: string) -> bool {
    let (db = JavaDB::load("coref_java_src.db")) {
        for (f in File::__all__(db)) {
            if (path = f.getName()) {
                return true
            }
        }
    }
}
```

##### 数据加载方法 `fn __all__(db)`

`schema`可以包含一个特别的**静态方法**，用于加载它在数据库中的数据集。

```rust
impl File {
    @data_constraint
    fn __all__(db: JavaDB) -> *File {
        ...
    }
}
```

这种方法必须包含特殊注解`@data_constraint`，表明该方法专用于加载，如果不写该注解，则该方法的返回为**空集合**。该方法返回类型必须为其本身的集合。

包含了该方法的`schema`可以使用一个语法糖来获取其全集：

```rust
fn out() -> bool {
    for(f in File(JavaDB::load("..."))) {
        ...
    }
    ...
}
// 等价于
fn out() -> bool {
    for(f in File::__all__(JavaDB::load("..."))) {
        ...
    }
    ...
}
```

##### 自定义全集方法

`schema`允许使用不同于`__all__`名称的**静态方法**来表明一些集合也存在于该类型的全集中。该方法也必须包含特殊注解`@data_constraint`。该方法一般用于手动添加一些数据到该类型的全集中。

```rust
impl File {
    @data_constraint
    fn extend_example() -> *File {
        yield File {id: 1234567}
    }
}
```

#### 构造匿名实例

GödelScript 允许用一个特定语法生成匿名实例。生成匿名实例的前提是该实例存在于该`schema`的全集中，除非该用法出现在`@data_constraint`方法中，否则结果为空。

```rust
schema A {
    @primary id: int,
    name: string
}
```

对应的应该使用如下语法来进行匿名实例的生成:

```rust
A {id: 1, name: "first"}
```

#### Schema 继承

GödelScript 中，`schema`继承非常便捷，使用样例如下:

```rust
schema MyFile extends File {}
```

##### 父类 Field 继承

子类会默认将父类的所有 field 继承下来。所以无需手动重写。

```rust
schema File {
    @primary id: int,
    name: string
}

schema MyFile extends File {}
```

##### 父类 Method 继承

子类会默认继承父类的所有 method，除了标注`@data_constraint`的方法。所以无需手动重写。但是需要注意的是，`__all__`方法较为特殊，不会被继承，所以需要重新编写`__all__`方法确定继承后的 schema 的全集。

```rust
schema File {
    @primary id: int,
    name: string
}

impl File {
    @data_constraint
    fn __all__() -> *File {...}
    fn getId(self) -> int {...}
    fn staticMethod() -> string {return "File"}
}

schema MyFile extends File {}
```

##### Method Override

如果子类的实现中存在与父类同名的方法，则父类的方法会被子类方法**覆盖**。

```rust
schema File {
    @primary id: int,
    name: string
}

impl File {
    fn staticMethod() -> string {return "File"}
}

schema MyFile extends File {}

impl MyFile {
    fn staticMethod() -> string {return "MyFile"}
}
```

此时`File::staticMethod`被`MyFile::staticMethod`覆盖，所以调用子类的该方法时，获取的结果为`"MyFile"`。

### 数据库

#### 数据库声明

数据库的声明格式如下:

```rust
database DatabaseName {
    // table_name 对应的是 db 中真实的表名
    // GodelSchemaType 对应的是将表数据读入 godel 后，存储的对应的 schema
    table_name : *GodelSchemaType
}
```

冒号前是加载的数据库中的**真实表名**，冒号后是其对应的**数据表格式**，必须为`schema`类型。
例如 db 中存在一张表，名字为`annotation`，对应的`schema`是`Annotation`，写法为：

```rust
database JavaDB {
    // 从 db 的 annotation 表中读取数据，存入 Annotation 中
    annotation : *Annotation
}
```

另外需要保证`Annotation`结构必须和表结构一致，例如:

```rust
schema Annotation {
    @primary id: int, // primary注解表示该字段为主键，一个表也可以没有主键
    content: string
}
```

就必须要求`annotation`表中必须有`id`和`content`字段，并且存储类型必须对应。

#### 数据库加载

数据库类型拥有静态方法`(database)::load(filename: string)`

```rust
fn loadDatabaseExample() -> bool {
    // load 中传入的 string 为 db 的文件名，而不需要路径
    // 因为 db 的路径会在执行 godel 时，通过命令行参数传入
    let (db: JavaDB = JavaDB::load("...")) {
        ...
    }
}
```

#### 数据表获取

上文中的例子中，要拿到`annotation`表，可以这样做：

```rust
fn getAnnotation() -> Annotation {
    // load 中传入的 string 为 db 的文件名，而不需要路径
    // 因为 db 的路径会在执行 godel 时，通过命令行参数传入
    let (db: JavaDB = JavaDB::load("...")) {
        // 直接使用 db.field 就可以拿到表数据了
        for (anno: Annotation in db.annotation) {
            ...
        }
    }
}
```

### Trait

#### Trait 声明

`trait`声明语法如下:

```rust
trait Example {
    fn getId(self) -> int;
    fn getName(self) -> string;
    fn getValueByName(self, name: string) -> string;
}
```

#### Impl Trait

写法与`impl`类似，但是必须要将`trait`中声明的所有函数都实现出来，否则无法通过编译。

```rust
impl Example for XmlElement {
    fn getId(self) -> int {return self.id}
    fn getName(self) -> int {return self.name}
    fn getValueByName(self, name: string) -> int {
        for(attr in XmlAttribute(XmlDB::load("...")) {
            if (attr.getName() = name && attr.id = self.getAttribute().id) {
                return attr.getValue()
            }
        }
    }
}
```

### Import

GödelScript 使用`use`关键字来引入其他文件的符号:

```rust
use coref::java::* // 引用全部符号
use coref::xml::Location // 引用单个符号
use coref::xml::{XmlDB, XmlElement} // 引用多个符号
```

#### 模块引用规则

GödelScript 包管理器会在传入参数中含有`-p {package dir path}`时启用。

包管理器会对文件夹结构进行解析，遍历其中所有的`.gdl`后缀文件。在拿到文件的相对路径后，会将路径映射到对应的包路径。如果文件的相对路径中存在`-`，或者路径中存在一个文件夹名或者文件名或者`.`后跟随的第一个字符是数字， 则该路径不会被包管理器接受，但是包管理器不会对其进行报错，只进行忽略处理。

如果想知道忽略了哪些路径，可以使用`-v`参数，包管理器在有该参数的情况下会将忽略的路径作为`warning`报出。如果最终映射的路径中，存在路径冲突的情况，那么包管理器会将其作为`error`报出并退出编译进程。

```rust
packages:
  coref::cfamily    -> /.../Library/coref.cfamily.gdl
  coref::go         -> /.../Library/coref.go.gdl
  coref::java       -> /.../Library/coref.java.gdl
  coref::javascript -> /.../Library/coref.javascript.gdl
  coref::properties -> /.../Library/coref.properties.gdl
  coref::python     -> /.../Library/coref.python.gdl
  coref::sql        -> /.../Library/coref.sql.gdl
  coref::xml        -> /.../Library/coref.xml.gdl
modules
  +--coref -> coref
     |--xml -> coref::xml
     |--properties -> coref::properties
     |--cfamily -> coref::cfamily
     |--java -> coref::java
     |--javascript -> coref::javascript
     |--go -> coref::go
     |--sql -> coref::sql
     +--python -> coref::python
```

#### 路径映射样例

```rust
Library
|-- coref.java.gdl
|-- coref.xml.gdl
+-- coref
    |-- go.gdl
    +-- a
        +-- b.gdl
=>
coref::java
coref::xml
coref::go
coref::a::b
```

该样例中，路径出现冲突

```rust
Library
|-- coref
|   |-- java.gdl
|   +-- python.gdl
+-- coref.python.gdl
=>
coref::java
coref::python -- \
                  > 出现冲突
coref::python -- /
```

该样例中，路径存在不合法字符

```rust
Library
|-- 0123.gdl
|-- my-godel-lib
|   +-- js.gdl
+-- lib-file.123.gdl
=>
0123
^ 第一个字符为数字
my-godel-lib::js
  ^     ^ 使用了 `-` 字符
lib-file::123
   ^      ^ 使用了一个字符为数字，并且路径中包含 `-`
```

#### 符号冲突

在使用过程中，难免会遇到如下的情况。此时直接使用`File`会被告知符号冲突，需要指定其中一个符号。

```rust
use coref::java::Location
use coref::xml::Location
schema MyLoc extends Location {}
                     ^^^^^^^^
Error: "Location" is ambiguous, with multiple symbols
       "coref::java::Location, coref::xml::Location".
```

与其他语言类似，GödelScript允许通过完整路径的方式直接指定一个符号，但是该符号必须被引入。

```rust
use coref::java::Location
use coref::xml::Location
schema MyLoc extends coref::xml::Location {}
```

完整路径符号可以被用于以下情况:

- schema 继承

```rust
schema JavaLocation extends coref::java::Location {}
```

- 函数参数和返回值

```rust
fn return_java_file(f: coref::java::File) -> coref::java::File {
    ...
}
```

- database 声明

```rust
database MyDB {
    java_file: coref::java::File,
    xml_file: coref::xml::File,
    java_loc: coref::java::Location,
    xml_loc: coref::xml::Location
}
```

- query 列表类型声明

```rust
query example from
    coref::java::Location loc in coref::java::Location(coref::java::JavaDB::load("..."))
where
    ...
select
    ...
```

- schema 静态方法调用

```rust
for(loc in coref::java::Location(coref::java::JavaDB::load("..."))) {
    ...
}

stmt.to<coref::java::ElementParent>()
stmt.is<coref::java::ElementParent>()
```

### Query

Query 用于进行一些简单的查询，编写的 query 一定会被输出，即使没有声明`main`函数。Query 的语法格式如下：

```rust
query 名字 from
    变量名 in 初始值,
    变量名 in 初始值,
    变量名 in 初始值
where 条件
select 值 as 输出的列名
    值 as 输出的列名,
    值 as 输出的列名,
    值 as 输出的列名
```

from 列表中的变量声明无需加上类型标注，编译器会进行自动推导，另外此处初始化不会使用`=`号，而是`in`关键字。此外，select 列表中，输出的列名不能和参与计算的变量名冲突，但是列名可以被省略。被省略的列名会在输出结果时采取随机名字，所以尽量不要省略。

下面是用 query 语法编写的`hello world`：

```rust
query hello_world from
    info in "hello world"
select info as greeting
```

上面的代码等价于如下代码：

```rust
fn hello_world(greeting: string) -> bool {
    let (info = "hello world") {
        if (greeting = info) {
            return true
        }
    }
}
fn main() {
    output(hello_world())
}
```

#### 样例和组成结构

Query 包含了查询名称，`from`列表，`where`筛选条件，`select`列表。

```rust
// script
use coref::java::{Callable, Class, Interface, JavaDB}

fn db() -> JavaDB {
    return JavaDB::load("coref_java_src.db")
}

query class_method from
    Callable m in Callable(db()),
    Class c in Class(db())
where
    c.id = m.getBelongedClass().id
select
    c.getQualifiedName() as className,
    m.getName() as methodName,
    m.getSignature() as methodSignature
```

#### 等价代码

上面的例子等价于如下代码：

```rust
// script
use coref::java::{Callable, Class, Interface, JavaDB}

fn db() -> JavaDB {
  return JavaDB::load("coref_java_src.db")
}

fn main() {
  output(class_method())
}

fn class_method(className: string, methodName: string, methodSignature: string) -> bool {
  for (m in Callable(db()), c in Class(db())) {
    if (c.id = m.getBelongedClass().id) {
      if (className = c.getQualifiedName() &&
          methodName = m.getName() &&
          methodSignature = m.getSignature()) {
        return true
      }
    }
  }
}
```

### Ungrounded Error: 未赋值/未绑定错误

GödelScript 会将未与数据绑定的符号判定为`ungrounded(未赋值/未绑定)`。基本判定规则为:

- 未初始化的/未被使用的/未与集合绑定的符号
   - 未被绑定的`int` `string`参数
   - 未被使用的 database 类型的参数
   - 函数体有语句，但是没有任何返回语句
- 在取非运算块中进行绑定的符号
   - 例如 `!(__tmp = 1)`，`__tmp`会被认为是未绑定的
   - 在取非运算块中调用 inline 函数或数据构造函数

#### 1. 未使用的 database/基础类型参数

函数代码块中，如果有一个语句分支没有使用参数中的`database`或者基础类型参数，则一定会导致`ungrounded`：

```rust
fn test(db: JavaDB, a: int, b: string) -> bool {}
        ^^          ^       ^                  ^^
Error: ungrounded parameter "db, a, b" in this branch.
```

编译器会提示在哪一条执行分支中存在 unused paramemter，根据提示检查对应的执行路径，补全对 parameter 的约束即可。

存在某些函数，在调用的时候，参数虽然是基础类型，但是传入的都是字面量，那这时如果错误地报出了`ungrounded`，可以给该函数添加`@inline`注解，来避免错误的约束检测。

```rust
impl XXX {
    @inline
    fn getValueByAttributeNameByDefaultValue(self, attributeName: string) -> string {
        if (self.hasAttribute(attributeName)) {
            return self.getValueByAttributeName(attributeName)
        }
        if (!self.hasAttribute(attributeName)) {
            return "null"
        }
    }
}

fn xxx() -> xx {
    ..
    attr.getValueByAttributeNameByDefaultValue("pattern")
                                               ^^^^^^^^^ 使用了字面量, 添加@inline来通过检测
}
```

#### 2. 函数体有语句的情况下无返回语句

GödelScript 允许一个函数体不包含任何语句，即空函数体。但是如果函数体中有其他语句，则 GödelScript 会要求必须有至少一个返回语句，否则就会出现 ungrounded error。

```rust
fn test() -> int {}
                  ^^ 没有语句，可以通过编译

fn test() -> int {
    let (a = 1) {}
    ^^^^^^^^^^^^^^ 有语句的情况下，没有返回语句，ungrounded
}
```

#### 3. 取非运算块中使用 inline 函数或数据构造函数

上文提到了可以通过`@inline`注解来规避 ungrounded error。但是如果在取非运算中使用了含有该注解的函数，则必然会导致 ungrounded error。

同样，数据构造函数实际的作用就是对一个临时中间变量进行绑定，但是这会直接导致 ungrounded error。
所以综上所述，在取非运算块中使用 inline 函数或者数据构造函数，必然会导致 ungrounded error，编译器会对所有类似的情况直接报错。

```rust
if (!check(method.to<ElementParent>())) {
           ^^^^^^^^^^^^^^^^^^^^^^^^^^ ungrounded
}
if (!check(ElementParent {id: 0})) {
           ^^^^^^^^^^^^^^ ungrounded
}

@inline
fn for_test() -> ElementParent {
    ...
}
if (!check(for_test())) {
           ^^^^^^^^^^ 取非运算中存在 inline 函数，ungrounded
}
```

#### 4. 对链式调用的取非运算

GödelScript 未对该情况执行`ungrounded`检测，但是该写法会导致在 Soufflé 中报`ungrounded`错误:

```rust
use coref::java::*

fn default_java_db() -> JavaDB {
    return JavaDB::load("coref_java_src.db")
}

fn get_field() -> *Field {
    for (field in Field(default_java_db())) {
        if (!field.getLocation().getFile().getRelativePath().contains("/test/")) {
            yield field
        }
    }
}
```

其中:

```rust
!field.getLocation().getFile().getRelativePath().contains("/test/")
```

实际会被翻译为类似如下的 Soufflé 代码片段:

```rust
!(__tmp = field, Field_getLocation(__tmp, __tmp_1), ..., contains("/test/", __tmp_4))
  ^^^^^                                   ^^^^^^^
```

其中用于中间存储的变量在`!(...)`中被绑定，但是由于取非操作符，这个绑定被认为是假设的，但是`__tmp`,`__tmp_1`却被认为是被声明出来整个语句范围内可见的变量，从而导致`ungrounded`。

可以采取声明中间变量接住中间结果的方式来避免取非运算中的绑定操作:

```rust
fn get_field() -> *Field {
    for (field in Field(default_java_db())) {
        let (path = field.getLocation().getFile().getRelativePath()) {
            if (!path.contains("/test/")) {
                yield field
            }
        }
    }
}
```

## 查询示例

### Java

#### 未使用方法

```rust
// script
use coref::java::*

fn default_java_db() -> JavaDB {
    return JavaDB::load("coref_java_src.db")
}

// find unused methods
fn unused_method(unused: string) -> bool {
    for(c in Callable(default_java_db()), method in Callable(default_java_db()), caller in method.getCaller()) {
        if (c != caller && unused = method.getSignature()) {
            return true
        }
    }
}

fn main() {
    output(unused_method())
}
```

#### 类继承关系

```rust
// script
use coref::java::*

fn default_java_db() -> JavaDB {
    return JavaDB::load("coref_java_src.db")
}

/**
 * Find all class and the inheritances
 * including parent class inheritance and ancestor class inheritance
 */
fn class_hierarchy(className : string, superClassName : string) -> bool {
    for (c in Class(default_java_db()), ancestor in c.getAnAncestorClass()) {
        if (className = c.getQualifiedName() &&
            superClassName = ancestor.getQualifiedName()) {
            return true
        }
    }
}

fn main() { 
    output(class_hierarchy())
}
```

#### 类的所有方法信息

```rust
// script
use coref::java::*

fn default_java_db() -> JavaDB {
    return JavaDB::load("coref_java_src.db")
}

// Find all methods of the class
fn methods(className : string, methodName : string) -> bool {
    for (c in Class(default_java_db()), m in c.getAllMethods()) {
        if (className = c.getQualifiedName() &&
            methodName = m.getName()){
            return true
        }
    }
}

fn main() { 
    output(methods())
}
```

### Python

#### 获取函数圈复杂度

```rust
// script
use coref::python::*

fn default_db() -> PythonDB {
    return PythonDB::load("coref_python_src.db")
}

/**
 * Get cyclomatic complexity of functions
 *
 * @param name   function name
 * @param value  cyclomatic complexity of function
 * @param path   path of file including this function
 * @param sline  function start line
 * @param eline  function end line
 */
fn getCyclomaticComplexity(
    name: string,
    value: int,
    path: string,
    sline: int,
    eline: int) -> bool {
    // get metric function
    for (c in MetricFunction(default_db())) {
        if (path = c.getLocation().getFile().getRelativePath() &&
            name = c.getQualifiedName() &&
            value = c.getCyclomaticComplexity() &&
            sline = c.getLocation().getStartLineNumber() &&
            eline = c.getLocation().getEndLineNumber()) {
            return true
        }
    }
}

fn main() {
    output(getCyclomaticComplexity())
}
```

#### 注释率统计

```rust
// script
use coref::python::*

schema PublicVisitedElement extends CombineElement {}

impl PublicVisitedElement {
    @data_constraint
    pub fn __all__(db: PythonDB) -> *PublicVisitedElement {
        for (tmp in Class(db)) {
            yield PublicVisitedElement {id: tmp.element_oid}
        }
        for (tmp in Function(db)) {
            yield PublicVisitedElement {id: tmp.element_oid}
        }
    }
}

fn default_db() -> PythonDB {
    return PythonDB::load("coref_python_src.db")
}


// count number of total public element
fn countTotalPublicElement() -> int {
    return PublicVisitedElement(default_db()).len()
}

// get public elements with Docstring comment
fn withDocstringCommentElement() -> *PublicVisitedElement {
    let (db = default_db()) {
        for (e in PublicVisitedElement(db), j in DocstringComment(db)) {
            if (e.key_eq(j.getDocumentableElement())) {
                yield e
            }
        }
    }
}

// count number of public elements with Docstring comment
fn countTotalPublicDocumentedElement() -> int {
    return withDocstringCommentElement().len()
}

fn withPublicDocumentedBelowElement() -> *PublicVisitedElement {
    let (db = default_db()) {
        for (e in PublicVisitedElement(db), j in Comment(db)) {
            if (e.key_eq(j.getDocumentedClassOrFunctionElement())) {
                yield e
            }
        }
    }
}

// count number of public element with single line comment
fn countTotalPublicDocumentedBelowElement() -> int {
    return withPublicDocumentedBelowElement().len()
}


// calculate documented percentage
fn getDocumentedPercentage(documentedPercentage: int) -> bool {
    let (i = countTotalPublicElement(),
        j = countTotalPublicDocumentedElement(),
        k = countTotalPublicDocumentedBelowElement()) {
        if (i = 0) {
            if (documentedPercentage = -1) {
                return true
            }
        }
        if (i != 0) {
            if (documentedPercentage = (j + k) * 1000 / i) {
                return true
            }
        }
    }
}

fn main() {
    output(getDocumentedPercentage())
}
```

#### 函数注释情况

```rust
// script
use coref::python::*

schema PublicVisitedElement extends CombineElement {}

impl PublicVisitedElement {
    @data_constraint
    pub fn __all__(db: PythonDB) -> *PublicVisitedElement {
        for (tmp in Class(db)) {
            yield PublicVisitedElement {id: tmp.element_oid}
        }
        for (tmp in Function(db)) {
            yield PublicVisitedElement {id: tmp.element_oid}
        }
    }

    pub fn getName(self) -> string {
        let (tmp = Class(__all_data__).find(self)) {
            return tmp.getQualifiedName() 
        }
        let (tmp = Function(__all_data__).find(self)) {
            return tmp.getQualifiedName() 
        }
    }
}

fn default_db() -> PythonDB {
    return PythonDB::load("coref_python_src.db")
}

fn hasComment(e: PublicVisitedElement) -> bool {
    let (db = default_db()) {
        for (j in DocstringComment(db)) {
            if (e.key_eq(j.getDocumentableElement())) {
                return true
            }
        }
        for (j in Comment(db)) {
            if (e.key_eq(j.getDocumentedClassOrFunctionElement())) {
                return true
            }
        }
    }
}

/**
 * Get comment of each public element
 *
 * @param type          public visited element type
 * @param name          public visited element name
 * @param filePath      file path
 * @param sline         element start line
 * @param eline         element end line
 * @param isCommented   if is commented
 */
fn output_result(
    type: string,
    name: string,
    filePath: string,
    sline: int,
    eline: int,
    isCommented: int) -> bool {
    for (e in PublicVisitedElement(default_db())) {
        if (type = e.getType() && 
            name = e.getName() &&
            filePath = e.getLocation().getFile().getRelativePath() &&
            sline = e.getLocation().getStartLineNumber() &&
            eline = e.getLocation().getEndLineNumber()) {
            if (hasComment(e)) {
                if (isCommented = 1) {
                    return true
                }
            }
            if (!hasComment(e)) {
                if (isCommented = 0) {
                    return true
                }
            }
        }
    }
}

fn main() {
    output(output_result())
}
```

### JavaScript

#### AST Print

```rust
// script
use coref::javascript::*

/**
 * print AST
 *
 * @param filePath          file path
 * @param parentId          parent node ID
 * @param parentKind        parent node kind
 * @param parentStartLine   parent node start line
 * @param parentEndLine     parent node end line
 * @param childId           child node ID
 * @param childKind         child node kind
 * @param childStartLine    child node start line
 * @param childEndLine      child node end line
 * @param index             child node index
 */
fn out(
    filePath: string,
    parentId: int,
    parentKind: string,
    parentStartLine: int,
    parentEndLine: int,
    childId: int,
    childKind: string,
    childStartLine: int,
    childEndLine: int,
    index: int
) -> bool {
    let (db = JavascriptDB::load("coref_javascript_src.db")) {
        for (parent in Node(db),
            child in Node(db),
            parentSyntaxKind in SyntaxKind(),
            childSyntaxKind in SyntaxKind(),
            parentLocation in Location(db),
            childLocation in Location(db),
            file in File(db)) {
            if (parent.key_eq(child.getParent()) &&
                parentId = parent.id &&
                childId = child.id &&
                parentSyntaxKind.id = parent.getKind() &&
                childSyntaxKind.id = child.getKind() &&
                parentKind = parentSyntaxKind.getName() &&
                childKind = childSyntaxKind.getName() &&
                index = child.getIndex() &&
                parentLocation = parent.getLocation() &&
                childLocation = parent.getLocation() &&
                file = parentLocation.getFile() &&
                filePath = file.getRelativePath() &&
                parentStartLine = parentLocation.getStartLineNumber() &&
                parentEndLine = parentLocation.getEndLineNumber() &&
                childStartLine = childLocation.getStartLineNumber() &&
                childEndLine = childLocation.getEndLineNumber()) {
                return true
            }
        }
    }
}

fn main() {
    output(out())
}
```

#### 圈复杂度

```rust
// script
use coref::javascript::*

fn default_db() -> JavascriptDB {
    return JavascriptDB::load("coref_javascript_src.db")
}

/**
 * Output the cyclomatic complexity of each function
 *
 * @param filePath      file path
 * @param functionName  function name
 * @param complexity    cyclomatic complexity
 * @param startLine     function start line
 * @param endLine       function end line
 */
fn out(filePath: string, functionName: string, complexity: int, startLine: int, endLine: int) -> bool {
    let (db = default_db()) {
        for (func in FunctionLikeDeclaration(db), file in File(db)) {
            if (complexity = func.getCyclomaticComplexity() &&
                functionName = func.getName() &&
                file = func.getLocation().getFile() &&
                filePath = file.getRelativePath() &&
                startLine = func.getLocation().getStartLineNumber() &&
                endLine = func.getLocation().getEndLineNumber()) {
                return true
            }
        }
    }
}

fn main() {
    output(out())
}
```

#### Change Effect

```rust
// script
use coref::javascript::*

fn default_db() -> JavascriptDB {
    return JavascriptDB::load("coref_javascript_src.db")
}

fn getACallerFunction(function: FunctionLikeDeclaration, callerFunction: FunctionLikeDeclaration) -> bool {
    for (mayInvokeExpression in MayInvokeExpression(default_db())) {
        if (mayInvokeExpression = function.getACallSite() &&
            callerFunction = mayInvokeExpression.getEnclosingFunction()) {
            return true
        }
    }
}

fn getAnEffectedFunction(function: FunctionLikeDeclaration, effectedFunction: FunctionLikeDeclaration) -> bool {
    if (getACallerFunction(function, effectedFunction)) {
        return true
    }
    for (callerFunction in FunctionLikeDeclaration(default_db())) {
        if (getACallerFunction(function, callerFunction) &&
            getAnEffectedFunction(callerFunction, effectedFunction)) {
            return true
        }
    }
}

/**
 * Query the effected functions according to the changed lines.
 *
 * @param function              the changed function id
 * @param signature             the changed function signature
 * @param functionPath          the changed function file path
 * @param startLine             the changed function start line
 * @param endLine               the changed function end line
 * @param effectedFunction      the effected function id
 * @param effectedSignature     the effected function signature
 * @param effectedFunctionPath  the effected function file path
 * @param effectedStartLine     the effected function start line
 * @param effectedEndLine       the effected function end line
 */
fn out(
    function: FunctionLikeDeclaration,
    signature: string,
    functionPath: string,
    startLine: int,
    endLine: int,
    effectedFunction: FunctionLikeDeclaration,
    effectedSignature: string,
    effectedFunctionPath: string,
    effectedStartLine: int,
    effectedEndLine: int
) -> bool {
    if (getAnEffectedFunction(function, effectedFunction)) {
        let (symbol = function.getSymbol(),
            effectedSymbol = effectedFunction.getSymbol(),
            location = function.getLocation(),
            effectedLocation = effectedFunction.getLocation()) {
            if (signature = symbol.getDescription() &&
                effectedSignature = effectedSymbol.getDescription() &&
                functionPath = location.getRelativePath() &&
                startLine = location.getStartLineNumber() &&
                endLine = location.getEndLineNumber() &&
                effectedFunctionPath = effectedLocation.getRelativePath() &&
                effectedStartLine = effectedLocation.getStartLineNumber() &&
                effectedEndLine = effectedLocation.getEndLineNumber()) {
                return true
            }
        }
    }
}

fn main() {
    output(out())
}
```

### XML

#### 获取 bean

```rust
// script
use coref::xml::*

schema BeanXmlElement extends XmlElement {}

impl BeanXmlElement {
    @data_constraint
    pub fn __all__(db: XmlDB) -> *BeanXmlElement {
        for (e in XmlElement(db)) {
            let (path = e.getLocation().getFile().getRelativePath()) {
                if (!path.contains("target") && e.getName() = "bean") {
                    yield BeanXmlElement {
                        id: e.id,
                        location_id: e.location_id,
                        parent_id: e.parent_id,
                        index_order: e.index_order
                    }
                }
            }
        }
    }
}

schema EntryXmlElement extends XmlElement {}

impl EntryXmlElement {
    @data_constraint
    pub fn __all__(db: XmlDB) -> *EntryXmlElement {
        for (e in XmlElement(db)) {
            if (e.getName() = "entry") {
                yield EntryXmlElement {
                    id: e.id,
                    location_id: e.location_id,
                    parent_id: e.parent_id,
                    index_order: e.index_order
                }
            }
        }
    }
}

schema PropertyXmlElement extends XmlElement {}

impl PropertyXmlElement {
    @data_constraint
    pub fn __all__(db: XmlDB) -> *PropertyXmlElement {
        for (e in XmlElement(db)) {
            if (e.getName() = "property") {
                yield PropertyXmlElement {
                    id: e.id,
                    location_id: e.location_id,
                    parent_id: e.parent_id,
                    index_order: e.index_order
                }
            }
        }
    }
}

fn default_db() -> XmlDB {
    return XmlDB::load("coref_xml_src.db")
}

// get class name
fn getClassName(bean: BeanXmlElement) -> string {
    for (attr in bean.getAttribute()) {
        if (attr.getName() = "class") {
            return attr.getValue()
        }
    }
}

// get key
fn getKey(e: EntryXmlElement) -> string {
    for (attr in e.getAttribute()) {
        if (attr.getName() = "key") {
            return attr.getValue()
        }
    }
}

// output value and class info of the bean
fn output1(className: string, pName: string, kName: string) -> bool {
    let (db = default_db()) {
        for (bean in BeanXmlElement(db), p in PropertyXmlElement(db), e in EntryXmlElement(db)) {
            if (className = getClassName(bean) &&
                bean.key_eq(p.getParent()) &&
                p.key_eq(e.getParent().getParent()) &&
                pName = p.getName() &&
                kName = getKey(e)) {
                return true
            }
        }
    }
}

fn main() {
    output(output1())
}
```

#### POM

```rust
// script
use coref::xml::*

schema DependencyElement extends XmlElement {}

impl DependencyElement {
    @data_constraint
    pub fn __all__(db: XmlDB) -> *DependencyElement {
        for(e in XmlElement(db)) {
            if (e.getElementName() = "dependency") {
                yield DependencyElement {
                    id: e.id,
                    location_id: e.location_id,
                    parent_id: e.parent_id,
                    index_order: e.index_order
                }
            }
        }
    }
}

schema GroupElement extends XmlElement {}

impl GroupElement {
    @data_constraint
    pub fn __all__(db: XmlDB) -> *GroupElement {
        for(e in XmlElement(db)) {
            if (e.getElementName() = "groupId") {
                yield GroupElement {
                    id: e.id,
                    location_id: e.location_id,
                    parent_id: e.parent_id,
                    index_order: e.index_order
                }
            }
        }
    }
}

schema VersionElement extends XmlElement {}

impl VersionElement {
    @data_constraint
    pub fn __all__(db: XmlDB) -> *VersionElement {
        for(e in XmlElement(db)) {
            if (e.getElementName() = "version") {
                yield VersionElement {
                    id: e.id,
                    location_id: e.location_id,
                    parent_id: e.parent_id,
                    index_order: e.index_order
                }
            }
        }
    }
}

schema ArtifactElement extends XmlElement {}

impl ArtifactElement {
    @data_constraint
    pub fn __all__(db: XmlDB) -> *ArtifactElement {
        for(e in XmlElement(db)) {
            if (e.getElementName() = "artifactId") {
                yield ArtifactElement {
                    id: e.id,
                    location_id: e.location_id,
                    parent_id: e.parent_id,
                    index_order: e.index_order
                }
            }
        }
    }
}

schema PomFile extends XmlFile {}

impl PomFile {
    @data_constraint
    pub fn __all__(db: XmlDB) -> *PomFile {
        for(f in XmlFile(db)) {
            if (f.getFileName() = "pom.xml") {
                yield PomFile {
                    id: f.id,
                    file_name: f.file_name,
                    relative_path: f.relative_path
                }
            }
        }
    }
}

// output relative path of the file, referenced jar name and version
fn out(fileName: string, m1: string, m2: string, m3: string) -> bool {
    let (db = XmlDB::load("coref_xml_src.db")) {
        for (f in PomFile(db),
            e1 in GroupElement(db),
            e2 in VersionElement(db),
            e3 in ArtifactElement(db),
            c1 in XmlCharacter(db),
            c2 in XmlCharacter(db),
            c3 in XmlCharacter(db),
            p in DependencyElement(db)) {
            if (f.key_eq(p.getLocation().getFile()) &&
                fileName = f.getRelativePath() &&
                p.key_eq(e1.getParent()) &&
                e1.key_eq(c1.getBelongedElement()) &&
                m1 = c1.getText() &&
                p.key_eq(e2.getParent()) &&
                e2.key_eq(c2.getBelongedElement()) &&
                m2 = c2.getText() &&
                p.key_eq(e3.getParent()) &&
                e3.key_eq(c3.getBelongedElement()) &&
                m3 = c3.getText()) {
                return true
            }
        }
    }
}

fn main() {
    output(out())
}
```

#### RPC

```rust
// script
use coref::xml::*

// select XmlElement containing "mobileService"
schema MobileServiceXmlElement extends XmlElement{}

impl MobileServiceXmlElement {
    @data_constraint
    pub fn __all__(db: XmlDB) -> *MobileServiceXmlElement {
        for (e in XmlElement(db)) {
            if (e.getElementName() = "mobileService") {
                yield MobileServiceXmlElement {
                    id: e.id,
                    location_id: e.location_id,
                    parent_id: e.parent_id,
                    index_order: e.index_order
                }
            }
        }
    }

    pub fn getServiceBeanValue(self) -> string {
        for (a in self.getAttribute()) {
            if (a.getName() = "serviceBean") {
                return a.getValue()
            }
        }
    }
}

// select XmlElement containing "sofa:extension"
schema SofaExtensionXmlElement extends XmlElement{}
impl SofaExtensionXmlElement {
    @data_constraint
    pub fn __all__(db: XmlDB) -> *SofaExtensionXmlElement {
        for (e in XmlElement(db)) {
            if (e.getName() = "sofa:extension") {
                yield SofaExtensionXmlElement {
                    id: e.id,
                    location_id: e.location_id,
                    parent_id: e.parent_id,
                    index_order: e.index_order
                }
            }
        }
    }
}

fn out(value: string) -> bool {
    let (db = XmlDB::load("coref_xml_src.db")) {
        for (m in MobileServiceXmlElement(db), s in SofaExtensionXmlElement(db), ancestor in m.getAnAncestor()) {
            if (s.key_eq(ancestor) && value = m.getServiceBeanValue()) {
                return true
            }
        }
    }
}

fn main() {
    output(out())
}
```

### Go

#### 获取所有文件的基本信息

```rust
// script
use coref::go::*

fn default_db() -> GoDB {
    return GoDB::load("coref_go_src.db")
}
/**
 * @param name          file name
 * @param funcCount     function/method quantity
 * @param totallines    total lines of file
 * @param codelines     code line of file
 * @param commentlines  comment line of fine
 * @param md5           md5 of this file
 * @param sha256        sha256 of this file
 */
fn out(
    name: string,
    funcCount: int,
    totallines: int,
    codelines: int,
    commentlines: int,
    md5: string,
    sha256: string) -> bool {
    for(f in File(default_db())) {
        if (name = f.getName() &&
            funcCount = f.getFunctionCount() &&
            md5 = f.getMd5Sum() &&
            sha256 = f.getSha256Sum() &&
            totallines = f.getLineInfo().getNumberOfTotalLines() &&
            codelines = f.getLineInfo().getNumberOfCodeLines() &&
            commentlines = f.getLineInfo().getNumberOfCommentLines()) {
            return true
        }
    }
}

fn main() {
    output(out())
}
```

#### 获取函数及其关联的注释

```rust
// script
use coref::go::*

fn default_db() -> GoDB {
    return GoDB::load("coref_go_src.db")
}

// Define a predicate called 'out' with parameters fileName, funcName, funcComment, and signature
fn out(fileName: string, funcName: string, funcComment: string, signature: string) -> bool {
    // Check if there exists a Function object 'func'
    for(func in Function(default_db())) {
        if (
            // Get the name of the file the function belongs to and assign it to the variable 'fileName'
            fileName = func.getBelongsFile().getName() &&
            // Get the name of the function and assign it to the variable 'funcName'
            funcName = func.getName() &&
            // Get the associated comment string for the function and assign it to the variable 'funcComment'
            funcComment = func.getAssociatedCommentString() &&
            // Get the function type signature and assign it to the variable 'signature'
            signature = func.getFunctionTypeSignature()) {
            return true
        }
    }
}

fn main() {
    output(out())
}
```

#### 获取函数圈复杂度

```rust
// script
use coref::go::*

fn default_db() -> GoDB {
    return GoDB::load("coref_go_src.db")
}

/**
 * @param name: file name
 * @param func: function name
 * @param cmplx: function cyclomatic complexity
 * @param sl,el,sc,ec: function location info
 */
fn out(name: string, func: string, cmplx: int, sl: int, el: int) -> bool {
    for(f in GoFile(default_db()), function in Function(default_db())) {
        if ((!f.isAutoGenereatedFile()) &&
            f.key_eq(function.getBelongsFile()) &&
            name = f.getName() &&
            func = function.getName() &&
            cmplx = function.getCyclomaticComplexity() &&
            sl = function.getLocation().getStartLineNumber() &&
            el = function.getLocation().getEndLineNumber()) {
            return true
        }
    }
}

fn main() {
    output(out())
}
```

## 查询调试和优化技巧

运行 GödelScript 脚本的时候，经常会出现运行时间超长的问题，这里提供一些基本判别方法和解决方案。

### Schema 传参导致笛卡尔积过大

函数传参在没有`@inline`注解的情况下，默认是作为“限定”条件，而不是一个传入值存在。

例如下面的这个例子中，`get`获取到一个`Class`类型的传入参数，但是实际上最终的编译结果会类似下面的代码：

```rust
fn check(class: Class) -> bool {
    if (class.getName().contains("io")) {
        return true
    }
}

// 实际的编译结果
fn check(class: Class) -> bool {
    // 实际上是要先拿 Class 全集
    for(__temp_class in Class::__all__(__all_data__)) {
        if (class = __temp_class ) {
            if (class.getName().contains("io")) {
                return true
            }
        }
    }
}
```

所以在传参中 schema 类型很多时，会出现多个 schema 全集做笛卡尔积的情况，空间和时间开销急剧增加。
解决方案也很简单，加一个`@inline`注解就可以：

```rust
@inline
fn check(class: Class) -> bool {
    if (class.getName().contains("io")) {
        return true
    }
}

fn example() -> bool {
    for(class in Class(default_java_db())) {
        if (check(class)) {
            return true
        }
    }
}

// inline 注解会强行在代码生成阶段将函数内联到语句中，避免多次加载表
// 实际的编译结果类似于
fn example() -> bool {
    for(class in Class(default_java_db())) {
        if (class.getName().contains("io")) {
            return true
        }
    }
}
```

### 多层 for 导致笛卡尔积过大

在一些情况下不可避免的会使用非常多层数的 for 来加载多表进行联查，导致笛卡尔积严重膨胀。可以通过提前减少 (过滤) 集合大小的方式来缩减笛卡尔积结果数量，例如：

```rust
fn getByIndex(self) -> Expression {
    let (db = default_java_db()) {
        for(e in Expression(db), p in Parameter(db)) {
            let (i = p.getIndex()) {
                if (e.key_eq(self.getValueByIndex(i))) {
                    return e
                }
            }
        }
    }
}
```

这个例子中，e, p 做笛卡尔积，导致中间过程占用时间太长。
i 实际上是从 p 的一个方法中得到的集合，并且在实际使用中，这个集合非常小，远比 Parameter 全集小，所以可以把 i 集合的获取抽出来变成单独的函数，生成小集合，避免大集合之间笛卡尔积运算的同时，还保证了结果的等价:

```rust
fn getAllParameterIndex() -> *int {
    let (db = default_java_db()) {
        for (p in Parameter(db)) {
            yield p.getIndex()
        }
    }
}

fn getByIndex(self) -> Expression {
    let (db = default_java_db()) {
        for(e in Expression(db), i in getAllParameterIndex()) {
            if (e.key_eq(self.getValueByIndex(i))) {
                return e
            }
        }
    }
}
```

e, p 的笛卡尔积就变成了 e, i 的笛卡尔积，从运算的层面来看，笛卡尔积开销变小，`getIndex`操作也被提前了，而不是在做笛卡尔积之后进行，所以性能大幅度提升。

### 不要滥用`@inline`/必须用`@inline`的优化策略

inline 函数的底层机制是在**调用处展开**，如果该函数不存在大量的 schema 传参，并且在很多位置都被调用，inline 可能会导致**编译结果膨胀且重复计算次数指数级增加**，有时反而不利于减少运行时间。
如果存在必须要使用 inline 的情况 (比如规避`ungrounded`)，但是使用之后反而出现运行速度变慢的情况，可以采取将内嵌语句拆分为 predicate 的方式来避免展开导致的编译结果膨胀。

下面的例子中，`getValueByAttributeNameByDefaultValue`为了避免`attributeName`被识别为`ungrounded`所以标注`inline`，后续在 if 分支中添加了一个条件语句，但是导致了执行时间从 3 秒变成 35 秒：

```rust
impl XmlElementBase {
  @inline
  fn getValueByAttributeNameByDefaultValue(self, attributeName: string) -> string {
    if (self.hasAttribute(attributeName)) {
      // return self.getValueByAttributeName(attributeName)
      // 更改为了如下语句:
      let(value = self.getValueByAttributeName(attributeName)) {
        if (value = "n/a") {
          return ""
        }
        if (value != "n/a") {
          return value
        }
      }
    }
    if (!self.hasAttribute(attributeName)) {
      return "null"
    }
  }
}
```

可以看到的是，增加了一层赋值和一层条件语句，在下文中，这个函数被调用了接近 20 次，导致了代码接近 20 次被重复展开，同时也造成了性能出现了一个数量级的差距。此时可以将更改的语句提取出来，由于提取出来的函数并没有使用复杂类型作为传参，所以不需要 inline 性能也没有损失，提取之后结果如下：

```rust
impl XmlElementBase {
  fn getTransValueByAttributeName(self, attributeName: string) -> string {
    let (value = self.getValueByAttributeName(attributeName)) {
      if (value = "n/a") {
        return ""
      }
      if (value != "n/a") {
        return value
      }
    }
  }
  @inline
  fn getValueByAttributeNameByDefaultValue(self, attributeName: string) -> string {
    if (self.hasAttribute(attributeName)) {
      return self.getTransValueByAttributeName(attributeName)
    }
    if (!self.hasAttribute(attributeName)) {
      return "null"
    }
  }
}
```

这样执行时间从 35 秒回到 3 秒，符合预期。

## 在本机使用查询脚本流程

参见[安装、配置、运行](./install_and_run.zh-CN.md)
