---
date: 2025-09-22 09:05:36
title: index
encrypt: false
permalink: /pages/093b9c
---
# 第一章：Optional（⭐）

## 1.1 概述

* 在实际开发中，我们经常会遇到 NullPointerException，如下所示：

```java
package com.github.lambda.optinal;

public class Test {
    public static void main(String[] args) {
        String str = null;

        // ❌ 运行错误：会报 java.lang.NullPointerException
        System.out.println(str.toLowerCase()); // [!code error]
    }
}
```

* 之前，我们都是这么处理 null 的，如下所示：

```java
package com.github.lambda.optinal;

public class Test {
    public static void main(String[] args) {
        String str = null;

        if (null != str) { // [!code highlight]
            System.out.println(str.toLowerCase());
        }
    }
}
```

* 但是，如果这样的模板代码充斥整个项目，就会感觉很不优雅：不这样写，不行；写了，都是重复、枯燥的动作。

> [!NOTE]
>
> * ① Java 中的 NullPointerException 本身没什么，Java 中的开箱即用的特性，可以让程序员快速定位到错误。
> * ② C/C++ 中经常遇到内存泄露（野指针、悬空指针），可是令很多程序员头疼的地方，需要配合很多工具来定位错误。

* Google 公司著名的 Guava 项目引入了 Optional 类，通过检查 null 值的方式来防止代码污染，鼓励程序员写出干净的代码。

```java
package com.github.lambda.optinal;

import com.google.common.base.Optional;

public class Test {
    public static void main(String[] args) {
        String str = null;

        Optional<String> optional = Optional.fromNullable(str); // [!code highlight]

        if (optional.isPresent()) { // [!code highlight]
            String s = optional.get(); // [!code highlight]
            System.out.println("s = " + s);
        }
    }
}
```

* 受到 Google 公司 Guava 项目的启发，Optional 类已经成为了 JDK8+ 类库的一部分。

```java
package com.github.lambda.optinal;

import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        String str = null;

        Optional<String> optional = Optional.ofNullable(str); // [!code highlight]

        if (optional.isPresent()) { // [!code highlight]
            String s = optional.get(); // [!code highlight]
            System.out.println("s = " + s);
        }
    }
}
```

> [!NOTE]
>
> * ① `Optional<T>`和`ArrayList<T>`类似，都是容器；只不过，Optional 是一个可以包含`非null`或`null`的容器对象 。
> * ② `Optional<T>`提供了很多有用的方法，这样我们就不用显示地进行 null 值处理。 

## 4.2 创建 Optional 对象

* 创建一个空的 Optional 对象（没有任何元素，即：内部元素是 null）：

```java
public static<T> Optional<T> empty() { // [!code focus]
    @SuppressWarnings("unchecked")
    Optional<T> t = (Optional<T>) EMPTY;
    return t;
} // [!code focus]
```

* 创建一个非空的 Optional 对象（必须有元素，即：不允许传递 null）：

```java
public static <T> Optional<T> of(T value) { // [!code focus]
    return new Optional<>(Objects.requireNonNull(value));
} // [!code focus]
```

* 创建一个可能为空的 Optional 对象（可以传递`null`或`非null`，推荐）：

```java
public static <T> Optional<T> ofNullable(T value) { // [!code focus]
    return value == null ? (Optional<T>) EMPTY
                         : new Optional<>(value);
} // [!code focus]
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        // 创建空的 Optional 对象
        Optional<String> optional = Optional.empty(); // [!code highlight]
        System.out.println(optional); // Optional.empty
    }
}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        // 创建 Optional 对象，但是不能传递 null
        Optional<String> optional = Optional.of("abc"); // [!code highlight]
        System.out.println(optional); // Optional[abc]

        // ❌ 运行错误：会报 java.lang.NullPointerException
        optional = Optional.of(null); // [!code error]
        System.out.println(optional); 
    }
}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        // 创建 Optional 对象，可以传递 null
        Optional<String> optional = Optional.ofNullable("abc"); // [!code highlight]
        System.out.println(optional); // Optional[abc]

        optional = Optional.ofNullable(null);  // [!code highlight]
        System.out.println(optional); // Optional.empty
    }
}
```

## 4.3 判断方法

* 判断 Optional 容器中是否有元素：

```java
public boolean isPresent() { // [!code focus]
    return value != null;
} // [!code focus]
```

* 判断 Optional 容器中是否有元素，如果有元素，则对其执行 Consumer 指定的操作：

```java
public void ifPresent(Consumer<? super T> action) { // [!code focus]
    if (value != null) {
        action.accept(value);
    }
} // [!code focus]
```

* 判断 Optional 容器中是否有元素，如果有元素，则对其执行 Consumer 指定的操作，否则，执行给定的空操作：

```java
public void ifPresentOrElse(Consumer<? super T> action, Runnable emptyAction) {
    if (value != null) {
        action.accept(value);
    } else {
        emptyAction.run();
    }
}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        Optional<String> optional = Optional.ofNullable("abc");
        System.out.println(optional.isPresent()); // true

        optional = Optional.ofNullable(null);
        System.out.println(optional.isPresent()); // false
    }
}
```



* 示例：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        Optional<String> optional = Optional.ofNullable("abc");
        optional.ifPresent((s) -> {
            System.out.println(s);
        });

        System.out.println("-------------------");

        optional = Optional.ofNullable(null);
        optional.ifPresent((s) -> {
            System.out.println(s);
        });
    }
}
```

```txt [cmd 控制台]
abc
-------------------
```

:::



* 示例：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        Optional<String> optional = Optional.ofNullable("abc");
        optional.ifPresentOrElse((s) -> {
            System.out.println(s);
        }, () -> {
            System.out.println("元素是 null ");
        });

        System.out.println("-------------------");

        optional = Optional.ofNullable(null);
        optional.ifPresentOrElse((s) -> {
            System.out.println(s);
        }, () -> {
            System.out.println("元素是 null ");
        });
    }
}
```

```txt [cmd 控制台]
abc
-------------------
元素是 null 
```

:::

## 4.4 获取元素方法

* 获取元素（要求 Optional 容器必须非空，即：如果是非空，会抛出异常）：

```java
public T get() { // [!code focus]
    if (value == null) {
        throw new NoSuchElementException("No value present");
    }
    return value;
} // [!code focus]
```

* 如果容器中有元素，则返回容器中的元素；否则，将返回给定的默认值：

```java
public T orElse(T other) { // [!code focus]
    return value != null ? value : other;
} // [!code focus]
```

* 如果容器中有元素，则返回容器中的元素；否则，将返回给定的符合 Supplier 函数式接口的 Lambda 表达式：

```java
public T orElseGet(Supplier<? extends T> supplier) { // [!code focus] 
    return value != null ? value : supplier.get();
} // [!code focus]
```

* 如果容器中有元素，则返回容器中的元素；否则，就抛出固定的异常：

```java
public T orElseThrow() { // [!code focus]
    if (value == null) {
        throw new NoSuchElementException("No value present");
    }
    return value;
} // [!code focus]
```

* 如果容器中有元素，则返回容器中的元素；否则，就抛出指定的异常：

```java
public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X { // [!code focus]
    if (value != null) {
        return value;
    } else {
        throw exceptionSupplier.get();
    }
} // [!code focus]
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        Optional<String> optional = Optional.ofNullable("abc");
        String str = optional.get();
        System.out.println("str = " + str); // str = abc
        
        optional = Optional.ofNullable(null); 
        // ❌ 运行错误：会报 java.lang.NullPointerException
        str = optional.get(); // [!code error]
        System.out.println("str = " + str);
    }
}
```



* 示例：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        List<String> strList = List.of("a", "b", "c");
        Optional<List<String>> optional = Optional.ofNullable(strList);
        List<String> list = optional.orElse(new ArrayList<>());
        System.out.println("list = " + list);

        System.out.println("--------------");

        optional = Optional.ofNullable(null);
        list = optional.orElse(new ArrayList<>());
        System.out.println("list = " + list);
    }
}
```

```txt [cmd 控制台]
list = [a, b, c]
--------------
list = []
```

:::



* 示例：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        List<String> strList = List.of("a", "b", "c");
        Optional<List<String>> optional = Optional.ofNullable(strList);
        List<String> list = optional.orElseGet(ArrayList::new);
        System.out.println("list = " + list);

        System.out.println("--------------");

        optional = Optional.ofNullable(null);
        list = optional.orElseGet(ArrayList::new);
        System.out.println("list = " + list);
    }
}
```

```txt [cmd 控制台]
list = [a, b, c]
--------------
list = []
```

:::



* 示例：

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        List<String> strList = List.of("a", "b", "c");
        Optional<List<String>> optional = Optional.ofNullable(strList);
        List<String> list = optional.orElseThrow();
        System.out.println("list = " + list); // list = [a, b, c]

        System.out.println("--------------");

        optional = Optional.ofNullable(null);
        // ❌ 运行错误：会报 java.lang.NoSuchElementException
        list = optional.orElseThrow(); // [!code error]
        System.out.println("list = " + list);
    }
}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        List<String> strList = List.of("a", "b", "c");
        Optional<List<String>> optional = Optional.ofNullable(strList);
        List<String> list = optional.orElseThrow(() -> new NoSuchElementException("没有元素"));
        System.out.println("list = " + list); // list = [a, b, c]

        System.out.println("--------------");

        optional = Optional.ofNullable(null);
        // ❌ 运行错误：会报 java.lang.NullPointerException
        list = optional.orElseThrow(() -> new NoSuchElementException("没有元素")); // [!code error]
        System.out.println("list = " + list);
    }
}
```

## 4.5 映射（转换）

* 如果容器中有元素，则对容器中的元素进行映射（转换）操作；否则，啥也不做：

```java
public <U> Optional<U> map(Function<? super T, ? extends U> mapper) { // [!code focus]
    Objects.requireNonNull(mapper);
    if (!isPresent()) {
        return empty();
    } else {
        return Optional.ofNullable(mapper.apply(value));
    }
} // [!code focus]
```

* 如果容器中有元素，则对容器中的元素进行降维映射（转换）操作；否则，啥也不做：

```java
public <U> Optional<U> flatMap(Function<? super T, ? extends Optional<? extends U>> mapper) { // [!code focus]
    Objects.requireNonNull(mapper);
    if (!isPresent()) {
        return empty();
    } else {
        @SuppressWarnings("unchecked")
        Optional<U> r = (Optional<U>) mapper.apply(value);
        return Objects.requireNonNull(r);
    }
} // [!code focus]
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        Optional<String> optional = Optional.ofNullable("abc");
        Optional<String> stringOptional = optional.map(String::toUpperCase);
        System.out.println(stringOptional.orElse("")); // ABC
    }
}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        Optional<List<String>> optional = Optional.ofNullable(List.of("abc", "bcd"));

        Optional<List<String>> upperCaseListOptional = optional.map(list ->
                list
                        .stream()
                        .map(String::toUpperCase)
                        .toList()
        );
        System.out.println(upperCaseListOptional.orElse(new ArrayList<>())); // [ABC, BCD]

    }
}
```



* 示例：

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}

```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.List;
import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        Student student = new Student(1, "张三", "男", "开发部", 5000.00);
        Optional<Student> optional = Optional.ofNullable(student);
        Optional<String> stringOptional = optional.map(Student::getName);
        System.out.println(stringOptional.orElse(""));  // 张三
    }
}
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}

```

```java [Test.java]
package com.github.lambda.optinal;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        List<Student> students = List.of(
                new Student(1, "张三", "男", "开发部", 5000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(3, "王五", "女", "测试部", 75000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(5, "王八", "男", "运营部", 4000.00)
        );
        Optional<List<Student>> optional = Optional.ofNullable(students);

        Optional<List<String>> stringListOptional = optional.flatMap(list -> Optional.ofNullable(list
                .stream()
                .map(Student::getName)
                .toList()));

        System.out.println(stringListOptional.orElse(new ArrayList<>())); // [张三, 李四, 王五, 赵六, 田七, 王八]
    }

}
```

:::

## 4.6 转换为 Stream

* 如果容器中有元素，则返回包含此元素的 Stream；否则，将返回一个空的 Stream：

```java
public Stream<T> stream() { // [!code focus] 
    if (!isPresent()) {
        return Stream.empty();
    } else {
        return Stream.of(value);
    }
} // [!code focus] 
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        String str = "abc";
        Optional<String> optional = Optional.ofNullable(str);
        Stream<String> stream = optional.stream();
        System.out.println("stream.count() = " + stream.count()); // stream.count() = 1

        str = null;
        optional = Optional.ofNullable(str);
        stream = optional.stream();
        System.out.println("stream.count() = " + stream.count()); // stream.count() = 0
    }

}
```

## 4.7 过滤

* 根据指定的条件，过滤 Optional 中的元素：

```java
public Optional<T> filter(Predicate<? super T> predicate) { // [!code focus] 
    Objects.requireNonNull(predicate);
    if (!isPresent()) {
        return this;
    } else {
        return predicate.test(value) ? this : empty();
    }
} // [!code focus] 
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        List<Integer> list = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
        Optional<List<Integer>> listOptional = Optional
                .ofNullable(list)
                .filter(x -> x.contains(5));
        // [1, 2, 3, 4, 5, 6, 7, 8, 9]
        listOptional.ifPresent(System.out::println); 
    }

}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        Optional<String> optional = Optional.of("abc123");

        optional
                .filter(s -> s.contains("abc"))
                .map(String::toUpperCase)
                .ifPresent(System.out::println); // ABC123
    }
}
```





# 第二章：Stream API（⭐）

## 2.1 概述

* Stream 是 JDK8 中处理集合的关键抽象概念，它可以指定你希望对集合进行的操作，可以执行非常复杂的查找、过滤和映射数据等操作。

> [!NOTE]
>
> * ① 使用 Stream API 对集合数据进行操作，就类似于使用 SQL 执行的数据库查询。
> * ② 可以使用 Stream API 来并行执行操作。
> * ③ Stream API 提供了一种高效且易于使用的处理数据的方式。

![](./assets/1.gif)

* Stream 是数据渠道，用于操作数据源（集合、数组等）所生成的元素序列。换言之，“集合讲的是数据，负责存储数据；Stream 流讲的是计算，负责处理数据！”。

> [!CAUTION]
>
> - ① Stream 自己不会存储元素。
>
> - ② Stream 不会改变源对象，每次处理读会返回一个持有结果的新的 Stream 。
>
> - ③ Stream 操作是延迟执行的，意味着会等到需要结果的时候才执行。

## 2.2 Stream 流操作的步骤

* Stream 流操作的步骤是：`创建 Stream 流`、`中间操作`以及`终结操作`，如下所示：

> [!NOTE]
>
> * ① 创建 Stream ：通过一个数据源（集合、数组等），获取一个流。
> * ② 中间操作：中间操作是个操作链，对数据源的数据进行 n 次处理，但是在终结操作前，并不会真正的执行。
> * ③ 终结操作（终止操作）：一旦执行终止操作，就执行中间操作链，最终产生结果并结束 Stream 。

![](./assets/2.svg)

> [!NOTE]
>
> 如何区分创建 Stream、中间操作以及终结操作？
>
> * ① 创建 Stream：就是各种方式获取 Stream 对象，如：`Stream stream = Stream.of(对象,...);`。
> * ② 中间操作：通过 Stream 对象调用其方法，并且返回值也是 Stream 对象，支持链式调用，如：`Stream stream = stream.filter(x -> x>=2).map(x -> x+2)`。
> * ③ 终结操作：通过 Stream 对象调用其方法，但是返回值不是 Stream 对象，而是一个具体的值，包括 void ，如：`List<String> list = stream.collection(Collectors.toList());`。

## 2.3 创建 Stream

### 2.3.1 构建流

* 根据已有数据构建 Stream 对象有三种：
  * ① 根据数组构建 Stream 流对象。
  * ② 根据对象构建 Stream 流对象。
  * ③ 根据集合构建 Stream 流对象。

* 其中，根据数组构建 Stream 流对象：

```java
Stream<T> stream = Arrays.stream(T[] array);
```

* 其中，根据对象构建 Stream 流对象：

```java
Stream<T> stream = Stream.of(T... values);
```

```java
Stream<T> stream = Stream.ofNullable(T t)
```

```java
Stream<T> stream = Stream.of(T t)
```

* 其中，根据集合构建 Stream 流对象：

```java
Stream<E> stream = collection.stream();
```



* 示例：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.Arrays;
import java.util.stream.IntStream;

public class Test {
    public static void main(String[] args) {
        IntStream stream = Arrays.stream(new int[]{1, 2, 3}); 

        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
1
2
3
```

:::



* 示例：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.Arrays;
import java.util.stream.IntStream;

public class Test {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.of(1, 2, 3);
        
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
1
2
3
```

:::



* 示例：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        List<Integer> list = List.of(1, 2, 3);

        Stream<Integer> stream = list.stream();

        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
1
2
3
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name, 
                   String gender, String department, 
                   Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        List<Student> list = List.of(
                new Student(1, "张三", "男", "开发部", 5000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(3, "王五", "女", "测试部", 75000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(6, "王八", "男", "运营部", 4000.00));

        Stream<Student> stream = list.stream();

        stream.forEach(System.out::println);
    }

}
```

```txt [cmd 控制台]
{id=1, name='张三', salary=5000.0, department='开发部', gender='男'}
{id=2, name='李四', salary=15000.0, department='测试部', gender='女'}
{id=3, name='王五', salary=75000.0, department='测试部', gender='女'}
{id=4, name='赵六', salary=7000.0, department='开发部', gender='女'}
{id=5, name='田七', salary=6000.0, department='测试部', gender='男'}
{id=6, name='王八', salary=4000.0, department='运营部', gender='男'}
```

:::

### 2.3.2 合并流

* 将两个流合并为一个流：

```java
Stream<T> stream = Stream.concat(stream1,stream2);
```



* 示例：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        Stream<Integer> stream1 = Stream.of(1, 2, 3);
        Stream<Integer> stream2 = Stream.of(4, 5, 6, 7);

        Stream<Integer> stream = Stream.concat(stream1, stream2);

        stream.forEach(System.out::println);
    }

}
```

```txt [cmd 控制台]
1
2
3
4
5
6
7
```

:::

### 2.3.3 生成流

* 根据范围生成流（不依赖现有数据生成流，仅限 IntStream、LongStream 以及 DoubleStream）：

```java
IntStream intStream = IntStream.range(int startInclusive, int endExclusive);
```

```java
IntStream intStream = IntStream.rangeClosed(int startInclusive, int endInclusive);
```

* 迭代流（不依赖现有数据生成流，但是依赖种子值（上一个数据））：

```java
Stream<T> stream = Stream.iterate(final T seed, final UnaryOperator<T> f);
```

```java
Stream<T> stream = Stream.iterate(T seed, Predicate<? super T> hasNext, UnaryOperator<T> next)
```

* 生成流（不依赖现有数据生成流，也不依赖种子值（上一个数据））：

```java
Stream<T> stream = Stream.generate(Supplier<? extends T> s)
```



* 示例：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.stream.IntStream;

public class Test {
    public static void main(String[] args) {
        IntStream intStream = IntStream.range(1, 10);

        intStream.forEach(System.out::println);
    }

}
```

```txt [cmd 控制台]
1
2
3
4
5
6
7
8
9
```

:::



* 示例：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.stream.IntStream;

public class Test {
    public static void main(String[] args) {
        IntStream intStream = IntStream.rangeClosed(1, 10);

        intStream.forEach(System.out::println);
    }

}
```

```txt [cmd 控制台]
1
2
3
4
5
6
7
8
9
10
```

:::



* 示例：

::: code-group

```java [Test.java]
package com.github.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 生成 1 3 5 7 ... 的奇数序列，根据上一个元素来生成
        Stream<Integer> stream = Stream
                .iterate(1, x -> x + 2)
                .limit(10);

        // 打印流中的数据
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
1
3
5
7
9
11
13
15
17
19
```

:::



* 示例：

::: code-group

```java [Test.java]
package com.github.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 生成 1 3 5 7 ... 的奇数序列，根据上一个元素来生成
        Stream<Integer> stream = Stream
                .iterate(1, (x) -> x <= 10, x -> x + 2);

        // 打印流中的数据
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
1
3
5
7
9
```

:::



* 示例：

::: code-group

```java [Test.java]
package com.github.optinal;

import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 随机生成 10 个 [0，100）之间的序列
        Stream<Integer> stream = Stream
                .generate(() -> ThreadLocalRandom
                        .current()
                        .nextInt(100))
                .limit(10);

        // 打印流中的数据
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
96
27
28
75
93
66
55
3
83
0
```

:::

## 2.4 中间操作

### 2.4.1 过滤

* 根据 Predicate 的结果，过滤 Stream 中的元素：

```java
Stream<T> stream2 = stream.filter(Predicate<? super T> predicate);
```



* 示例：

::: code-group

```java [Test.java]
package com.github.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9);

        // 中间操作：过滤，找到所有的偶数
        stream = stream.filter(x -> x % 2 == 0);

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
2
4
6
8
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name,
                   String gender, String department,
                   Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
```

```java [Test.java]
package com.github.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        List<Student> list = List.of(
                new Student(1, "张三", "男", "开发部", 5000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(3, "王五", "女", "测试部", 75000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(6, "王八", "男", "运营部", 4000.00));

        Stream<Student> stream = list.stream();

        // 中间操作：过滤，找到所有工资 > 10000 的员工
        stream = stream.filter(s -> s.getSalary() > 10000);

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
{id=2, name='李四', salary=15000.0, department='测试部', gender='女'}
{id=3, name='王五', salary=75000.0, department='测试部', gender='女'}
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name,
                   String gender, String department,
                   Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
```

```java [Test.java]
package com.github.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        List<Student> list = List.of(
                new Student(1, "张三", "男", "开发部", 5000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(3, "王五", "女", "测试部", 75000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(6, "王八", "男", "运营部", 4000.00));

        Stream<Student> stream = list.stream();

        // 中间操作：过滤，找到所有工资 >= 5000 并且姓名是男的员工
        stream = stream.filter(s ->
                (s.getSalary() >= 5000) && (s.getGender().equals("男")));

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
{id=1, name='张三', salary=5000.0, department='开发部', gender='男'}
{id=5, name='田七', salary=6000.0, department='测试部', gender='男'}
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name,
                   String gender, String department,
                   Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
```

```java [Test.java]
package com.github.optinal;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        List<Student> list = List.of(
                new Student(1, "张三", "男", "开发部", 5000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(3, "王五", "女", "测试部", 75000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(6, "王八", "男", "运营部", 4000.00));

        Stream<Student> stream = list.stream();

        // 中间操作：过滤，找到所有工资 >= 5000 并且姓名是男的员工
        Predicate<Student> salaryPredicate = s -> s.getSalary() >= 5000;
        Predicate<Student> manPredicate = s -> s
                .getGender()
                .equals("男");
        stream = stream.filter(salaryPredicate.and(manPredicate));

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
{id=1, name='张三', salary=5000.0, department='开发部', gender='男'}
{id=5, name='田七', salary=6000.0, department='测试部', gender='男'}
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name,
                   String gender, String department,
                   Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
```

```java [Test.java]
package com.github.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        List<Student> list = List.of(
                new Student(1, "张三", "男", "开发部", 5000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(3, "王五", "女", "测试部", 75000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(6, "王八", "男", "运营部", 4000.00));

        Stream<Student> stream = list.stream();

        // 中间操作：过滤，找到所有工资 >= 5000 并且姓名是男的员工
        stream = stream
                .filter(s -> s.getSalary() >= 5000)
                .filter(s -> s
                        .getGender()
                        .equals("男"));

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
{id=1, name='张三', salary=5000.0, department='开发部', gender='男'}
{id=5, name='田七', salary=6000.0, department='测试部', gender='男'}
```

:::

### 2.4.2 去重

* 去重（去除相同的元素，如果元素是对象，将调用对象的 equals 方法进行比较）：

```java
Stream<T> stream2 = stream.distinct();
```

* 排序：

```java
Stream<T> stream2 = stream.sorted(); // 自然排序
```

```java
Stream<T> stream2 = stream.sorted(Comparator<? super T> comparator); // 指定的比较器
```



* 示例：

::: code-group

```java [Test.java]
package com.github.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 1, 3, 4, 4, 2, 4, 3);

        // 中间操作：去重
        stream = stream.distinct();

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
2
4
6
8
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.optinal;

import java.util.Objects;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name,
                   String gender, String department,
                   Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(getId(), student.getId()) 
            && Objects.equals(getName(), student.getName()) 
            && Objects.equals(getSalary(), student.getSalary()) 
            && Objects.equals(getDepartment(), student.getDepartment()) 
            && Objects.equals(getGender(), student.getGender());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), 
                            getSalary(), getDepartment(), getGender());
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
```

```java [Test.java]
package com.github.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        List<Student> list = List.of(
                new Student(1, "张三", "男", "开发部", 5000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(3, "王五", "女", "测试部", 75000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(6, "王八", "男", "运营部", 4000.00),
                new Student(6, "王八", "男", "运营部", 4000.00),
                new Student(6, "王八", "男", "运营部", 4000.00)
        );

        Stream<Student> stream = list.stream();

        // 中间操作：去重，如果是对象，会调用对象的 equals 方法进行比较
        stream = stream.distinct();

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
{id=1, name='张三', salary=5000.0, department='开发部', gender='男'}
{id=2, name='李四', salary=15000.0, department='测试部', gender='女'}
{id=3, name='王五', salary=75000.0, department='测试部', gender='女'}
{id=4, name='赵六', salary=7000.0, department='开发部', gender='女'}
{id=5, name='田七', salary=6000.0, department='测试部', gender='男'}
{id=6, name='王八', salary=4000.0, department='运营部', gender='男'}
```

:::

### 2.4.3 排序

* 根据默认的比较器对元素进行排序，即：自然排序：

```java
Stream<T> stream2 = stream.sorted(); 
```

* 根据指定的比较器对元素进行排序，即：自定义排序：

```java
Stream<T> stream2 = stream.sorted(Comparator<? super T> comparator); 
```



* 示例：

::: code-group

```java [Test.java]
package com.github.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, -1, -3, -4, 4, 2, 4, 3);

        // 中间操作：从小到大排序
        // stream = stream.sorted((a, b) -> a.compareTo(b));
        stream = stream.sorted(Integer::compareTo);

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
-4
-3
-1
1
2
2
3
4
4
```

:::



* 示例：

::: code-group

```java [Test.java]
package com.github.optinal;

import java.util.Comparator;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, -1, -3, -4, 4, 2, 4, 3);

        // 中间操作：从大到小排序
        // stream = stream.sorted((a, b) -> b.compareTo(a));
        stream = stream.sorted(Comparator.reverseOrder());

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
4
4
3
2
2
1
-1
-3
-4
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.optinal;

import java.util.Objects;

public class Student implements Comparable<Student> {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name,
                   String gender, String department,
                   Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(getId(), student.getId()) 
            && Objects.equals(getName(), student.getName()) 
            && Objects.equals(getSalary(), student.getSalary()) 
            && Objects.equals(getDepartment(), student.getDepartment()) 
            && Objects.equals(getGender(), student.getGender());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), 
                            getSalary(), getDepartment(), getGender());
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }

    @Override
    public int compareTo(Student o) {
        return this
                .getSalary()
                .compareTo(o.getSalary());
    }
}
```

```java [Test.java]
package com.github.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        List<Student> list = List.of(
                new Student(1, "张三", "男", "开发部", 5000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(3, "王五", "女", "测试部", 75000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(6, "王八", "男", "运营部", 4000.00)
        );

        Stream<Student> stream = list.stream();

        // 中间操作：根据工资，从小到大进行排序
        stream = stream.sorted();

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
{id=6, name='王八', salary=4000.0, department='运营部', gender='男'}
{id=1, name='张三', salary=5000.0, department='开发部', gender='男'}
{id=5, name='田七', salary=6000.0, department='测试部', gender='男'}
{id=4, name='赵六', salary=7000.0, department='开发部', gender='女'}
{id=2, name='李四', salary=15000.0, department='测试部', gender='女'}
{id=3, name='王五', salary=75000.0, department='测试部', gender='女'}
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.optinal;

import java.util.Objects;

public class Student implements Comparable<Student> {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name,
                   String gender, String department,
                   Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(getId(), student.getId()) 
            && Objects.equals(getName(), student.getName()) 
            && Objects.equals(getSalary(), student.getSalary()) 
            && Objects.equals(getDepartment(), student.getDepartment()) 
            && Objects.equals(getGender(), student.getGender());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), 
                            getSalary(), getDepartment(), getGender());
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }

    @Override
    public int compareTo(Student o) {
        return this
                .getSalary()
                .compareTo(o.getSalary());
    }
}
```

```java [Test.java]
package com.github.optinal;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        List<Student> list = List.of(
                new Student(1, "张三", "男", "开发部", 5000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(3, "王五", "女", "测试部", 75000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(6, "王八", "男", "运营部", 4000.00)
        );

        Stream<Student> stream = list.stream();

        // 中间操作：根据工资，从大到小进行排序
        // stream = stream.sorted((a, b) -> Double.compare(b.getSalary(), a.getSalary()));
        stream = stream.sorted(Comparator
                .comparingDouble(Student::getSalary)
                .reversed());

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
{id=3, name='王五', salary=75000.0, department='测试部', gender='女'}
{id=2, name='李四', salary=15000.0, department='测试部', gender='女'}
{id=4, name='赵六', salary=7000.0, department='开发部', gender='女'}
{id=5, name='田七', salary=6000.0, department='测试部', gender='男'}
{id=1, name='张三', salary=5000.0, department='开发部', gender='男'}
{id=6, name='王八', salary=4000.0, department='运营部', gender='男'}
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.optinal;

import java.util.Objects;

public class Student implements Comparable<Student> {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name,
                   String gender, String department,
                   Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(getId(), student.getId()) 
            && Objects.equals(getName(), student.getName()) 
            && Objects.equals(getSalary(), student.getSalary()) 
            && Objects.equals(getDepartment(), student.getDepartment()) 
            && Objects.equals(getGender(), student.getGender());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), 
                            getSalary(), getDepartment(), getGender());
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }

    @Override
    public int compareTo(Student o) {
        return this
                .getSalary()
                .compareTo(o.getSalary());
    }
}
```

```java [Test.java]
package com.github.optinal;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        List<Student> list = List.of(
                new Student(1, "张三", "男", "开发部", 5000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(3, "王五", "女", "测试部", 75000.00),
                new Student(7, "哈哈哈", "女", "测试部", 75000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(8, "呵呵呵", "男", "测试部", 6000.00),
                new Student(6, "王八", "男", "运营部", 4000.00)
        );

        Stream<Student> stream = list.stream();

        // 中间操作：根据工资进行从大到小排序，如果工资相同，按照姓名的长度排序
        stream = stream.sorted(Comparator
                .comparingDouble(Student::getSalary)
                .reversed()
                .thenComparingInt(s -> s
                        .getName()
                        .length()));

        // 终结操作
        stream.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
{id=3, name='王五', salary=75000.0, department='测试部', gender='女'}
{id=7, name='哈哈哈', salary=75000.0, department='测试部', gender='女'}
{id=2, name='李四', salary=15000.0, department='测试部', gender='女'}
{id=4, name='赵六', salary=7000.0, department='开发部', gender='女'}
{id=5, name='田七', salary=6000.0, department='测试部', gender='男'}
{id=8, name='呵呵呵', salary=6000.0, department='测试部', gender='男'}
{id=1, name='张三', salary=5000.0, department='开发部', gender='男'}
{id=6, name='王八', salary=4000.0, department='运营部', gender='男'}
```

:::

### 2.4.4 调试（了解）

* 对流进行调试：

```java
Stream<T> stream2 = stream.peek(Consumer<? super T> action);
```

> [!NOTE]
>
> * ① 在观察流在不同阶段的状态或进行日志追踪流的过程中使用 peek()，其余场景不要使用 peek()。
> * ② peek() 是一个中间操作，不会单独执行，除非调用终结操作，如：forEach 等。



* 示例：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        Stream<String> stream = names.stream();

        // 中间操作
        stream = stream
                .filter(name -> name.length() > 3)
                .peek(name -> System.out.println("After filter: " + name))
                .map(String::toUpperCase)
                .peek(name -> System.out.println("After map: " + name));

        // 终结操作
        List<String> list = stream.toList();
        System.out.println(list);
    }

}
```

```txt [cmd 控制台]
After filter: Alice
After map: ALICE
After filter: Charlie
After map: CHARLIE
[ALICE, CHARLIE]
```

:::

### 2.4.5 截取

* 直接给出截取位置（跳过前 n 个，保留剩余）：

```java
Stream<T> stream2 = stream.skip(long n);
```

* 直接给出截取位置（保留前 n 个，其余舍弃）：

```java
Stream<T> stream2 = stream.limit(long maxSize);
```

* 根据条件确定截取位置（条件成立保留，一旦条件不成立，其余舍弃）：

```java
Stream<T> stream2 = stream.takeWhile(Predicate<? super T> predicate) {
```

* 根据条件确定截取位置（条件成立舍弃，一旦条件不成立，其余保留）：

```java
Stream<T> stream2 = stream.dropWhile(Predicate<? super T> predicate) 
```

* 示例：

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 中间操作
        stream = stream.skip(2);

        // 终结操作
        List<Integer> list = stream.toList();
        System.out.println(list); // [3, 4, 5, 6, 7, 8, 9, 10]
    }

}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 中间操作
        stream = stream.limit(2);

        // 终结操作
        List<Integer> list = stream.toList();
        System.out.println(list); // [1, 2]
    }

}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 中间操作
        stream = stream.takeWhile(i -> i <= 5); 

        // 终结操作
        List<Integer> list = stream.toList();
        System.out.println(list); // [1, 2, 3, 4, 5]
    }

}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 中间操作
        stream = stream.dropWhile(i -> i <= 5);

        // 终结操作
        List<Integer> list = stream.toList();
        System.out.println(list); // [6, 7, 8, 9, 10]
    }

}
```

### 2.4.6 映射（转换）

* 将流中的元素进行映射（转换）：

```java
Stream<R> stream2 = stream.map(Function<? super T, ? extends R> mapper);
```

* 将流中的元素进行扁平化映射（转换），即：降维（二维变为一维）：

```java
Stream<R> stream2 = stream.flatMap(Function<? super T, ? extends Stream<? extends R>> mapper);
```

> [!NOTE]
>
> * ① map 和 flatMap 的理解：
>   * map：一对一，将一个元素映射（转换）为另一个元素。
>   * flatMap：一对多+扁平化，将一个元素转换为一个流，然后“拍扁”合成一个新流。
> * ② map 和 flatMap 的区别：
>
> | 特性     | map                                       | flatMap                                                     |
> | -------- | ----------------------------------------- | ----------------------------------------------------------- |
> | 转换关系 | 一对一（`T --> R`）                       | 一对多（`T --> Stream<R>`），然后“拍扁”                     |
> | 返回类型 | `Stream<R>`                               | `Stream<R>`                                                 |
> | 函数参数 | `Function<? super T, ? extends R> mapper` | `Function<? super T, ? extends Stream<? extends R>> mapper` |
> | 应用场景 | 类型转换、字段提取等                      | 嵌套结构（`List<List<?>>`）“拍扁”(`List<?>`)                |
>
> * ③ 如果 `f` 返回 `Stream<R>`，map 和 flatMap 的结果，如下所示：
>
> ```java
> stream.map(f) -> Stream<Stream<R>> // f --> Stream<R>
> ```
>
> ```java
> stream.flatMap (f) -> Stream<R> // f --> Stream<R>
> ```

* 将流转换为基础流，如：IntStream、LongStream 以及 DoubleStream：

```java
IntStream stream2 = stream.mapToInt(ToIntFunction<? super T> mapper);
```

```java
LongStream stream2 = stream.mapToLong(ToLongFunction<? super T> mapper);
```

```java
DoubleStream stream2 = stream.mapToDouble(ToDoubleFunction<? super T> mapper);
```

* 将流进行扁平化映射为基础流，如：IntStream、LongStream 以及 DoubleStream：

```java
IntStream stream2 = stream.flatMapToInt(Function<? super T, ? extends IntStream> mapper);
```

```java
LongStream stream2 = stream.flatMapToLong(Function<? super T, ? extends LongStream> mapper);
```

```java
DoubleStream stream2 = stream.flatMapToDouble(Function<? super T, ? extends DoubleStream> mapper);
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 中间操作
        stream = stream.map(i -> i * 2);

        // 终结操作
        List<Integer> list = stream.toList();
        System.out.println(list); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
    }

}
```



* 示例：

::: code-group

```java [Student.java]
package com.github.optinal;

import java.util.Objects;

public class Student implements Comparable<Student> {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name,
                   String gender, String department,
                   Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(getId(), student.getId()) 
            && Objects.equals(getName(), student.getName()) 
            && Objects.equals(getSalary(), student.getSalary()) 
            && Objects.equals(getDepartment(), student.getDepartment()) 
            && Objects.equals(getGender(), student.getGender());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), 
                            getSalary(), getDepartment(), getGender());
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }

    @Override
    public int compareTo(Student o) {
        return this
                .getSalary()
                .compareTo(o.getSalary());
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        List<Student> students = List.of(
                new Student(1, "张三", "男", "开发部", 5000.00),
                new Student(2, "李四", "女", "测试部", 15000.00),
                new Student(3, "王五", "女", "测试部", 75000.00),
                new Student(4, "赵六", "女", "开发部", 7000.00),
                new Student(5, "田七", "男", "测试部", 6000.00),
                new Student(5, "王八", "男", "运营部", 4000.00)
        );
        Stream<Student> stream = students
                .stream();

        // 中间操作
        // Stream<String> stringStream = stream
        //         .map(s -> s.getName());
        Stream<String> stringStream = stream
                .map(Student::getName);

        // 终结操作
        List<String> list = stringStream.toList();
        System.out.println(list); // [张三, 李四, 王五, 赵六, 田七, 王八]

    }

}
```

:::



* 示例：

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("Hello", "World");

        // 中间操作
        stream = stream.flatMap(s -> Stream.of(s.split("")));

        // 终结操作
        List<String> list = stream.toList();
        System.out.println(list); // [H, e, l, l, o, W, o, r, l, d]

    }

}
```



* 示例：

::: code-group

```java [Student.java]
package com.github.optinal;

import java.util.Objects;

public class Student implements Comparable<Student> {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;

    public Student() {
    }

    public Student(Integer id, String name,
                   String gender, String department,
                   Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(getId(), student.getId()) 
            && Objects.equals(getName(), student.getName()) 
            && Objects.equals(getSalary(), student.getSalary()) 
            && Objects.equals(getDepartment(), student.getDepartment()) 
            && Objects.equals(getGender(), student.getGender());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), 
                            getSalary(), getDepartment(), getGender());
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }

    @Override
    public int compareTo(Student o) {
        return this
                .getSalary()
                .compareTo(o.getSalary());
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<List<Student>> stream = Stream.of(
                List.of(
                        new Student(1, "张三", "男", "开发部", 5000.00),
                        new Student(2, "李四", "女", "测试部", 15000.00)
                ),
                List.of(
                        new Student(3, "王五", "女", "测试部", 75000.00),
                        new Student(4, "赵六", "女", "开发部", 7000.00),
                        new Student(5, "田七", "男", "测试部", 6000.00),
                        new Student(5, "王八", "男", "运营部", 4000.00))
        );

        // 中间操作
        // Stream<Student> studentStream = stream.flatMap(s -> s.stream());
        Stream<Student> studentStream = stream.flatMap(Collection::stream);

        // 终结操作
        Stream<String> stringStream = studentStream.map(Student::getName);
        System.out.println(stringStream.toList()); // [张三, 李四, 王五, 赵六, 田七, 王八]

    }

}
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;
    private Integer age;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Student(Integer id, String name, String gender, String department, Double salary, Integer age) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.IntSummaryStatistics;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Student> stream = Stream.of(
                new Student(1, "张三", "男", "开发部", 5000.00, 16),
                new Student(2, "李四", "女", "测试部", 15000.00, 45),
                new Student(3, "王五", "女", "测试部", 75000.00, 35),
                new Student(4, "赵六", "女", "开发部", 7000.00, 40),
                new Student(5, "田七", "男", "测试部", 6000.00, 25),
                new Student(5, "王八", "男", "运营部", 4000.00, 20)
        );

        // 中间操作
        IntStream intStream = stream.mapToInt(Student::getAge);

        // 终结操作
        IntSummaryStatistics intSummaryStatistics = intStream.summaryStatistics();
        double average = intSummaryStatistics.getAverage();
        System.out.println("average = " + BigDecimal
                .valueOf(average)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue()); // average = 30.17
        long count = intSummaryStatistics.getCount();
        System.out.println("count = " + count); // count = 6
        int max = intSummaryStatistics.getMax();
        System.out.println("max = " + max); // max = 45
        int min = intSummaryStatistics.getMin(); 
        System.out.println("min = " + min); // min = 16
        long sum = intSummaryStatistics.getSum();
        System.out.println("sum = " + sum); // sum = 181
    }
}
```

:::

## 2.5 终结操作

### 2.5.1 查找

* 返回流中第一个元素：

```java
Optional<T> optional = stream.findFirst();
```

* 返回流中任意元素：

```java
Optional<T> optional = stream.findAny();
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Optional;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9);

        // 中间操作
        stream = stream.filter(x -> x > 5);

        // 终结操作
        Optional<Integer> optional = stream.findFirst();
        optional.ifPresent(System.out::println); // 6

    }

}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.stream.IntStream;

public class Test {
    public static void main(String[] args) {
        IntStream
                .range(0, 1_000_000)
                .parallel()
                .peek(x -> {
                    try {
                        Thread.sleep(10);  // 模拟耗时操作
                    } catch (InterruptedException e) {
                        Thread
                                .currentThread()
                                .interrupt();
                    }
                })
                .findAny()
                .ifPresent(i -> System.out.println("找到的元素是: " + i));
    }

}
```

### 2.5.2 判断

* 判断流中的元素是否有一个元素匹配规则：

```java
boolean b = stream.anyMatch(IntPredicate predicate);
```

* 判断流中的元素是否都匹配规则：

```java
boolean b = stream.allMatch(IntPredicate predicate);
```

* 判断流中的元素是否都不匹配规则：

```java
boolean b = stream.noneMatch(IntPredicate predicate);
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.stream.IntStream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        IntStream intStream = IntStream.range(1, 100);

        // 终结操作：判断流中元素是否有一个是偶数
        boolean b = intStream.anyMatch(x -> x % 2 == 0);
        System.out.println(b); // true
    }

}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.stream.IntStream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        IntStream intStream = IntStream.range(1, 100);

        // 终结操作：判断流中元素是否都是偶数
        boolean b = intStream.allMatch(x -> x % 2 == 0);
        System.out.println(b); // false
    }

}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.stream.IntStream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        IntStream intStream = IntStream.range(1, 100);

        // 终结操作：判断流中元素是否都不是偶数
        boolean b = intStream.noneMatch(x -> x % 2 == 0);
        System.out.println(b); // false
    }

}
```

### 2.5.3 化简（归约）

#### 2.5.3.1 概述

* 所谓的化简（归约）就是两两合并，最后得到一个值。

![化简（归约）](./assets/3.gif)

* 化简（归约）非常适合用于求最值（最大值、最小值）、求和、求总数等场景。

> [!NOTE]
>
> Java 中的 Map-Reduce 参考了 Google 的 Map-Reduce 模型，其开源实现框架就是 Hadoop。
>
> ::: details 点我查看  具体细节
>
> * ① 假设有这样的文本内容，如下所示：
>
> ```txt
> apple banana apple orange
> banana apple orange
> orange apple banana
> ```
>
> * ② **Map 阶段**：就是将每个单词映射为 `(单词, 1)` 的键值对。 
>
> ```txt
> ("apple", 1)
> ("banana", 1)
> ("apple", 1)
> ("orange", 1)
> ("banana", 1)
> ("apple", 1)
> ("orange", 1)
> ("apple", 1)
> ("banana", 1)
> ```
>
> * ③ **Shuffle 阶段**：根据键（单词）将相同键的值聚集在一起。
>
> ```txt
> ("apple", [1, 1, 1, 1])
> ("banana", [1, 1, 1])
> ("orange", [1, 1])
> ```
>
> * ④ **Reduce 阶段**：对相同键的所有值求和。
>
> ```java
> ("apple", 4)
> ("banana", 3)
> ("orange", 2)
> ```
> :::

#### 2.5.3.2 化简（归约）

* 将流中的元素两两进行合并（第一个元素作为初始化值）：

```java
Optional<T> optional = stream.reduce(BinaryOperator<T> accumulator);
```

* 将流中的元素两两进行合并（需要传入初始化值）：

```java
T t = stream.reduce(T identity, BinaryOperator<T> accumulator);
```

* 将流中的元素两两进行合并（需要传入初始化值，用于并发流）：

```java
U u = stream.reduce(U identity,
                 BiFunction<U, ? super T, U> accumulator,
                 BinaryOperator<U> combiner)
```

> [!NOTE]
>
> * ① 化简（归约）非常适合用于求最值（最大值、最小值）、求和、求总数的场景。
> * ② 三个参数的 reduce 方法用于并发流，后文讲解。



* 示例：求和

```java
package com.github.lambda.optinal;

import java.util.OptionalInt;
import java.util.stream.IntStream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        IntStream intStream = IntStream.rangeClosed(1, 100);

        // 终结操作：reduce
        // OptionalInt optional = intStream.reduce((prev, next) -> prev + next);
        OptionalInt optional = intStream.reduce(Integer::sum);
        optional.ifPresent(System.out::println); // 5050
    }

}
```



* 示例：求和

```java
package com.github.lambda.optinal;

import java.util.stream.IntStream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        IntStream intStream = IntStream.rangeClosed(1, 100);

        // 终结操作：reduce
        // int sum = intStream.reduce(0,(prev, next) -> prev + next);
        int sum = intStream.reduce(0, Integer::sum);
        System.out.println(sum); // 5050
    }

}
```



* 示例：求最值

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;
    private Integer age;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Student(Integer id, String name, String gender, String department, Double salary, Integer age) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.Optional;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Student> stream = Stream.of(
                new Student(1, "张三", "男", "开发部", 5000.00, 16),
                new Student(2, "李四", "女", "测试部", 15000.00, 45),
                new Student(3, "王五", "女", "测试部", 75000.00, 35),
                new Student(4, "赵六", "女", "开发部", 7000.00, 40),
                new Student(5, "田七", "男", "测试部", 6000.00, 25),
                new Student(5, "王八", "男", "运营部", 4000.00, 20)
        );

        // 终结操作，求年纪最大的学生
        Optional<Student> optional = stream.reduce((prev, next) -> prev.getAge() > next.getAge() ? prev : next);
        optional.ifPresent(System.out::println);
    }
}
```

```txt [cmd 控制台]
{id=2, name='李四', salary=15000.0, department='测试部', gender='女', age=45}
```

:::



* 示例：求最值

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;
    private Integer age;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Student(Integer id, String name, String gender, String department, Double salary, Integer age) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Student> stream = Stream.of(
                new Student(1, "张三", "男", "开发部", 5000.00, 16),
                new Student(2, "李四", "女", "测试部", 15000.00, 45),
                new Student(3, "王五", "女", "测试部", 75000.00, 35),
                new Student(4, "赵六", "女", "开发部", 7000.00, 40),
                new Student(5, "田七", "男", "测试部", 6000.00, 25),
                new Student(5, "王八", "男", "运营部", 4000.00, 20)
        );

        // 终结操作，求年纪最大的学生
        Student student = stream.reduce(new Student(-1, "-", "-", "-", 0.00, 0),
                (prev, next) -> prev.getAge() > next.getAge() ? prev : next);
        System.out.println(student);
    }
}
```

```txt [cmd 控制台]
{id=2, name='李四', salary=15000.0, department='测试部', gender='女', age=45}
```

:::



* 示例：求最值

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;
    private Integer age;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Student(Integer id, String name, String gender, String department, Double salary, Integer age) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.Comparator;
import java.util.Optional;
import java.util.function.BinaryOperator;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Student> stream = Stream.of(
                new Student(1, "张三", "男", "开发部", 5000.00, 16),
                new Student(2, "李四", "女", "测试部", 15000.00, 45),
                new Student(3, "王五", "女", "测试部", 75000.00, 35),
                new Student(4, "赵六", "女", "开发部", 7000.00, 40),
                new Student(5, "田七", "男", "测试部", 6000.00, 25),
                new Student(5, "王八", "男", "运营部", 4000.00, 20)
        );

        // 终结操作，求年纪最大的学生
        Optional<Student> optional = stream.reduce(BinaryOperator.maxBy(Comparator
                .comparingInt(Student::getAge)));
        optional.ifPresent(System.out::println);
    }
}
```

```txt [cmd 控制台]
{id=2, name='李四', salary=15000.0, department='测试部', gender='女', age=45}
```

:::



* 示例：求总数

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;
    private Integer age;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Student(Integer id, String name, String gender, String department, Double salary, Integer age) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.Optional;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Student> stream = Stream.of(
                new Student(1, "张三", "男", "开发部", 5000.00, 16),
                new Student(2, "李四", "女", "测试部", 15000.00, 45),
                new Student(3, "王五", "女", "测试部", 75000.00, 35),
                new Student(4, "赵六", "女", "开发部", 7000.00, 40),
                new Student(5, "田七", "男", "测试部", 6000.00, 25),
                new Student(5, "王八", "男", "运营部", 4000.00, 20)
        );

        // 终结操作，求学生的个数
        Optional<Integer> optional = stream
                .map(s -> 1)
                .reduce(Integer::sum);
        optional.ifPresent(System.out::println); // 6
    }
}
```

:::

#### 2.5.3.3 化简（归约）

* 求最大值：

```java
Optional<T> max(Comparator<? super T> comparator);
```

* 求最小值：

```java
Optional<T> min(Comparator<? super T> comparator);
```

* 求总数：

```java
long count();
```

> [!NOTE]
>
> * ① 由于`求最值`（最大值、最小值）以及`求总数`，在实际开发中非常常见，Java 就提供了 max、min、count 等方法，其底层是对 reduce 的封装。
> * ② 在实际开发中，我们可能还需要`求和`以及`求平均值`，可以将流通过 mapToInt 等方法转换为基本流，再进行对应的`求最值`（最大值、最小值）、`求总数`、`求和`以及`求平均值`。



* 示例：求最大值

```java
package com.github.lambda.optinal;

import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6);

        // 终结操作
        Optional<Integer> optional = stream.max(Comparator.comparingInt(Integer::intValue));
        optional.ifPresent(System.out::println); // 6
    }

}
```



* 示例：求最小值

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;
    private Integer age;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Student(Integer id, String name, String gender, String department, Double salary, Integer age) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Student> stream = Stream.of(
                new Student(1, "张三", "男", "开发部", 5000.00, 16),
                new Student(2, "李四", "女", "测试部", 15000.00, 45),
                new Student(3, "王五", "女", "测试部", 75000.00, 35),
                new Student(4, "赵六", "女", "开发部", 7000.00, 40),
                new Student(5, "田七", "男", "测试部", 6000.00, 25),
                new Student(5, "王八", "男", "运营部", 4000.00, 20)
        );

        // 终结操作
        Optional<Student> optional = stream.min(Comparator.comparingInt(Student::getAge));
        optional.ifPresent(System.out::println);
    }
}
```

```txt [cmd 控制台]
{id=1, name='张三', salary=5000.0, department='开发部', gender='男', age=16}
```

:::



* 示例：求总数

```java
package com.github.lambda.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6);

        // 终结操作
        long count = stream.count();
        System.out.println(count); // 6
    }

}
```


### 2.5.4 收集

#### 2.5.4.1 收集到数组中

* 将 Stream 中的元素收集到 Object 对象数组中：

```java
Object[] arr = stream.toArray();
```

* 将 Stream 中的元素收集到对应的对象数组中：

```java
A[] arr = stream.toArray(IntFunction<A[]> generator);
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Arrays;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6);

        // 终结操作
        Object[] array = stream.toArray();
        System.out.println(Arrays.toString(array)); // [1, 2, 3, 4, 5, 6]
    }

}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Arrays;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6);

        // 终结操作
        Integer[] array = stream.toArray(Integer[]::new);
        System.out.println(Arrays.toString(array)); // [1, 2, 3, 4, 5, 6]
    }

}
```

#### 2.5.4.2 收集到容器中

* 将 Stream 中的元素收集到指定的容器中，如：ArrayList、HashSet：

```java
R r = stream.collect(Supplier<R> supplier,
                  BiConsumer<R, ? super T> accumulator,
                  BiConsumer<R, R> combiner);
```

> [!NOTE]
>
> * ① supplier：`()-> c`，用于创建容器 c，因为 Java 中的容器很多，如：ArrayList、HashMap、HashSet 等，collect 并不知道程序员需要将流中的元素添加到哪个容器中。
> * ② accumulator： `(c,e)-> void`，累加器，用于将流中的元素添加到容器中，在 Java 中，每种容器添加的方式可能不同，如：Collection 是 add，而 Map 是 put。
> * ③ combiner：`(c1,c2) -> void`，合并器，用于并发流，后文讲解，暂时先传递参数为空实现！！！



* 示例：收集到 List 集合中

```java
package com.github.lambda.optinal;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        List<String> collect = stream.collect(
                () -> new ArrayList<>(),
                (list, e) -> list.add(e),
                (a, b) -> {});

        System.out.println(collect); // [apple, banana, cherry, apple, banana, pear]
    }

}
```



* 示例：收集到 Set 集合

```java
package com.github.lambda.optinal;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        Set<String> collect = stream.collect(
                () -> new HashSet<>(),
                (set, e) -> set.add(e),
                (a, b) -> {});

        System.out.println(collect); // [banana, apple, cherry, pear]
    }

}
```



* 示例：收集到 Map 集合

```java
package com.github.lambda.optinal;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        Map<String, Integer> hashMap = stream.collect(
                () -> new HashMap<>(),
                (map, e) -> map.put(e, e.length()),
                (a, b) -> {});

        System.out.println(hashMap); // {banana=6, apple=5, cherry=6, pear=4}
    }

}
```



* 示例：收集到 StringBuilder 中

```java
package com.github.lambda.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        StringBuilder stringBuilder = stream.collect(
                () -> new StringBuilder(),
                (sb, e) -> sb.append(e),
                (a, b) -> {});

        System.out.println(stringBuilder); // applebananacherryapplebananapear
    }

}
```



* 示例：收集到 StringJoiner 中

```java
package com.github.lambda.optinal;

import java.util.StringJoiner;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        StringJoiner joiner = stream.collect(
                () -> new StringJoiner(","),
                (stringJoiner, e) -> stringJoiner.add(e),
                (a, b) -> {});

        System.out.println(joiner); // apple,banana,cherry,apple,banana,pear
    }

}
```

### 2.5.5 收集器

#### 2.5.5.1 概述

* 之前，我们将 Stream 中的元素添加到各种容器中，如下所示：

::: code-group

```java [ArrayListTest.java]
package com.github.lambda.optinal;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class ArrayListTest {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        List<String> collect = stream.collect(
                () -> new ArrayList<>(),
                (list, e) -> list.add(e),
                (a, b) -> {});

        System.out.println(collect); // [apple, banana, cherry, apple, banana, pear]
    }

}
```

```java [HashSetTest.java]
package com.github.lambda.optinal;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

public class HashSetTest {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        Set<String> collect = stream.collect(
                () -> new HashSet<>(),
                (set, e) -> set.add(e),
                (a, b) -> {});

        System.out.println(collect); // [banana, apple, cherry, pear]
    }

}
```

:::

* 其实，上面的逻辑都很固定和重复，Java 官方也意识到了这个问题，于是提供了如下的方法：

> [!NOTE]
>
> 所谓的逻辑固定和重复指的是：
>
> * ① 第一个参数：告诉 collect 方法如何创建容器。
> * ② 第二个参数：告诉 collect 方法如何将流中的元素添加到容器中。
> * ③ 第三个参数：在并发流下，如何将两个容器中的元素合并到一起。

```java
R r = stream.collect(Collector<? super T, A, R> collector);
```

* 我们可以发现需要传递的参数是`Collector<? super T, A, R> collector`，即：收集器。

```java
public interface Collector<T, A, R> {
 	...   
}    
```

> [!NOTE]
>
> * ① Collector 是一个接口，如果我们自己去实现 Collector 内部的逻辑实现是太麻烦了。
> * ② 幸运的是，Java 官方已经写好了相关的逻辑了，即：Collectors 工具类，提供了很多静态方法，帮助我们将流中元素收集到各种不同类型的容器中。

#### 2.5.5.2 收集器

* 将 Stream 中的元素收集到指定的容器中：

```java
Collector<T, ?, List<T>> collector = Collectors.toList();
```

```java
Collector<T, ?, Set<T>> collector = Collectors.toSet();
```

```java
// mergeFunction 如果键冲突，选择现有值（即第一个出现的值）还是之后的值
Collector<T, ?, Map<K,U>> collector = Collectors.toMap(Function<? super T, ? extends K> keyMapper,
                                    Function<? super T, ? extends U> valueMapper,
                                    BinaryOperator<U> mergeFunction)
```

```java
Collector<CharSequence, ?, String> collector = Collectors.joining();
```

```java
Collector<CharSequence, ?, String> collector = Collectors.joining(CharSequence delimiter);
```

> [!NOTE]
>
> * ① 除了可以将流中的元素收集到可变的容器中，如：`Collector<T, ?, List<T>> collector = Collectors.toList()` 。
> * ② 还可以将流总的元素收集到不可变的容器中，如：`Collector<T, ?, List<T>> collector = Collectors.toUnmodifiableList()`。



* 示例：收集到 List 集合中

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        List<String> collect = stream.collect(Collectors.toList());
        System.out.println(collect); // [apple, banana, cherry, apple, banana, pear]
    }

}
```



* 示例：收集到 Set 集合

```java
package com.github.lambda.optinal;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test2 {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        Set<String> collect = stream.collect(Collectors.toSet());
        System.out.println(collect); // [banana, apple, cherry, pear]
    }

}
```



* 示例：收集到 Map 集合

```java
package com.github.lambda.optinal;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        Map<String, Integer> map = stream.collect(
                Collectors.toMap(
                        s -> s, 
                        s -> s.length(), 
                        (existing, replacement) -> existing));
        System.out.println(map); // [banana, apple, cherry, pear]
    }

}
```



* 示例：收集到 StringBuilder 中

```java
package com.github.lambda.optinal;

import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test2 {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        String str = stream.collect(
                Collectors.joining());
        System.out.println(str); // applebananacherryapplebananapear
    }

}
```



* 示例：收集到 StringJoiner 中

```java
package com.github.lambda.optinal;

import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test2 {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        String str = stream.collect(
                Collectors.joining(","));
        System.out.println(str); // apple,banana,cherry,apple,banana,pear
    }

}
```

### 2.5.6 下游收集器

#### 2.5.6.1  概述

* 之前，我们通过将流中元素收到到 Map 中，如下所示：

```java {13-17}
package com.github.lambda.optinal;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        Map<String, Integer> map = stream.collect(
                Collectors.toMap(
                        s -> s, 
                        s -> s.length(), 
                        (existing, replacement) -> existing));
        System.out.println(map); // [banana, apple, cherry, pear]
    }

}
```

* 当出现 key 冲突的时候，我们是使用已存在的 key，如下所示：

![](./assets/4.gif)

* 如果我们希望名字长度一样的在一组，如下所示：

```java
// 4 --> new ArrayList(["pear"])
// 5 --> new ArrayList(["apple","apple"])
// 6 --> new ArrayList(["banana","cherry",banana"])
Map<Integer,List<String> result = ....
```

> [!NOTE]
>
> * ① 上面的`Collectors.toMap`方法没有办法实现需求。
> * ② 只能使用`Collectors.groupBy`方法了，即：根据指定的条件将元素进行分组收集。

#### 2.5.6.2 下游收集器

* 根据指定的条件将元素进行分组收集：

```java
Collector<T, ?, Map<K, List<T>>> collector = Collectors.
    groupingBy(Function<? super T, ? extends K> classifier)
```

```java
Collector<T, ?, Map<K, D>> collector = Collectors.groupingBy(Function<? super T, ? extends K> classifier,
                                          Collector<? super T, A, D> downstream)
```

> [!NOTE]
>
> * ① classifier：x -> k 表示从 x 中提取 k。
> * ② downstream：下游收集器了，将提取的 k 保存到哪个容器中（如果没有参数，则默认收集到 List 容器中）。
> * ③ Collectors 中的静态方法都可以应用于 downstream（下游收集器），如：Collectors.toList()、Collectors.toSet() 等。



* 示例：

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        Map<Integer, List<String>> map = stream.collect(
                Collectors.groupingBy(String::length, Collectors.toList()));

        System.out.println(map); // {4=[pear], 5=[apple, apple], 6=[banana, cherry, banana]}
    }

}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<String> stream = Stream.of("apple", "banana", "cherry", "apple", "banana", "pear");

        // 终结操作
        Map<Integer, String> map = stream.collect(
                Collectors.groupingBy(String::length, Collectors.joining(",")));

        System.out.println(map); // {4=pear, 5=apple,apple, 6=banana,cherry,banana}
    }

}
```



* 示例：

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;
    private Integer age;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Student(Integer id, String name, String gender, String department, Double salary, Integer age) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Student> stream = Stream.of(
                new Student(1, "张三", "男", "开发部", 5000.00, 16),
                new Student(2, "李四", "女", "测试部", 15000.00, 45),
                new Student(3, "王五", "女", "测试部", 75000.00, 35),
                new Student(4, "赵六", "女", "开发部", 7000.00, 40),
                new Student(5, "田七", "男", "测试部", 6000.00, 25),
                new Student(5, "王八", "男", "运营部", 4000.00, 20)
        );

        // 终结操作，根据性别分组
        Map<String, List<Student>> map = stream.collect(Collectors.groupingBy(Student::getGender));
        map.forEach((key, value) -> {
            System.out.printf("key = %s ，", key);
            String str = value
                    .stream()
                    .map(Student::getName)
                    .collect(Collectors.joining(","));
            System.out.printf("value = %s \n", str);
        });
    }
}
```

```txt [cmd 控制台]
key = 女 ，value = 李四,王五,赵六 
key = 男 ，value = 张三,田七,王八 
```

:::

#### 2.5.6.3 下游收集器

* 专门和 groupingBy 配合的下游收集器，如下所示：

| 下游收集器                    | 作用                                         |
| ----------------------------- | -------------------------------------------- |
| `mapping(x->y,dc)`            | 将 x 转换为 y，通过下游收集器 dc 收集        |
| `flatMapping(x->substram,dc)` | 将 x 转换为 substram，通过下游收集器 dc 收集 |
| `filtering(x -> boolean, dc)` | 过滤后，通过下游收集器 dc 收集               |
| `counting()`                  | 求个数                                       |
| `minBy((a, b) -> optional)`   | 求最小值                                     |
| `maxBy((a, b) -> optional)`   | 求最大值                                     |
| `summingInt(x -> int)`        | 转换 int 后求和                              |
| `averagingInt(x -> int)`      | 转 int 后求平均                              |
| `reducing(init, (p, x) -> r)` | 化简（归约）                                 |
| `reduce((p, x) -> r)`         | 化简（归约）                                 |
| `reduce(init, (p, x) -> r)`   | 化简（归约）                                 |

> [!NOTE]
>
> * ① 除了 summingInt 之外，还有 summingDouble 以及 summingLong 。
> * ② 除了 averagingInt 之前，还有 averagingDouble 以及 averagingLong 。



* 示例：

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;
    private Integer age;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Student(Integer id, String name, String gender, String department, Double salary, Integer age) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Student> stream = Stream.of(
                new Student(1, "张三", "男", "开发部", 5000.00, 16),
                new Student(2, "李四", "女", "测试部", 15000.00, 45),
                new Student(3, "王五", "女", "测试部", 75000.00, 35),
                new Student(4, "赵六", "女", "开发部", 7000.00, 40),
                new Student(5, "田七", "男", "测试部", 6000.00, 25),
                new Student(5, "王八", "男", "运营部", 4000.00, 20)
        );

        // 终结操作，根据性别分组，但是分组后只保留姓名
        Map<String, List<String>> map = stream.collect(
                Collectors.groupingBy(Student::getGender,
                        Collectors.mapping(Student::getName, Collectors.toList())));
        map.forEach((k, v) -> System.out.println("key = " + k + "，value =" + v));
    }
}
```

```txt [cmd 控制台]
key = 女，value =[李四, 王五, 赵六]
key = 男，value =[张三, 田七, 王八]
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;
    private Integer age;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Student(Integer id, String name, String gender, String department, Double salary, Integer age) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Student> stream = Stream.of(
                new Student(1, "张三", "男", "开发部", 5000.00, 16),
                new Student(2, "李四", "女", "测试部", 15000.00, 45),
                new Student(3, "王五", "女", "测试部", 75000.00, 35),
                new Student(4, "赵六", "女", "开发部", 7000.00, 40),
                new Student(5, "田七", "男", "测试部", 6000.00, 25),
                new Student(5, "王八", "男", "运营部", 4000.00, 20)
        );

        // 终结操作，根据性别分组，但是过滤掉工资 < 10000 的人，并且只保留姓名
        Map<String, List<String>> map = stream.collect(
                Collectors.groupingBy(Student::getGender,
                        Collectors.filtering(student -> student.getSalary() > 10_000, 
                                Collectors.mapping(Student::getName, Collectors.toList()))));
        map.forEach((k, v) -> System.out.println("key = " + k + "，value =" + v));
    }
}
```

```txt [cmd 控制台]
key = 女，value =[李四, 王五]
key = 男，value =[]
```

:::



* 示例：

::: code-group

```java [Student.java]
package com.github.lambda.optinal;

public class Student {

    private Integer id;
    private String name;
    private Double salary;
    private String department;
    private String gender;
    private Integer age;

    public Student() {
    }

    public Student(Integer id, String name, String gender, String department, Double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
    }

    public Student(Integer id, String name, String gender, String department, Double salary, Integer age) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.gender = gender;
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", salary=" + salary +
                ", department='" + department + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java [Test.java]
package com.github.lambda.optinal;

import java.util.Comparator;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        Stream<Student> stream = Stream.of(
                new Student(1, "张三", "男", "开发部", 5000.00, 16),
                new Student(2, "李四", "女", "测试部", 15000.00, 45),
                new Student(3, "王五", "女", "测试部", 75000.00, 35),
                new Student(4, "赵六", "女", "开发部", 7000.00, 40),
                new Student(5, "田七", "男", "测试部", 6000.00, 25),
                new Student(5, "王八", "男", "运营部", 4000.00, 20)
        );

        // 终结操作，根据性别分组，分组后求每组工资最低的人
        final Map<String, Optional<Student>> map = stream.collect(
                Collectors.groupingBy(Student::getGender,
                        Collectors.minBy(Comparator.comparingDouble(Student::getSalary))));
        map.forEach((k, v) -> System.out.println("key = " + k + "，value =" + v));
    }
}
```

```txt [cmd 控制台]
key = 女，value =Optional[{id=4, name='赵六', salary=7000.0, department='开发部', gender='女', age=40}]
key = 男，value =Optional[{id=5, name='王八', salary=4000.0, department='运营部', gender='男', age=20}]
```

:::

### 2.5.7 基本类型流（基本流）

#### 2.5.7.1 概述

* 所谓的基本类型流（基本流）就是流中元素的数据类型是基本数据类型；而之前学习的普通流中元素的数据类型是引用数据类型。
* Java 内置了三种基本流，如下所示：
  * IntStream。
  * LongStream。
  * DoubleStream。

* 和对应的包装类组成的普通流对比，其性能相对更高。

#### 2.5.7.2 基本流

* IntStream 等基础流和普通流的使用没有什么区别：

```java
IntStream stream = IntStream.of(1,2,...);
```

```java
LongStream stream = LongStream.of(1L,2L,...);
```

```java
DoubleStream stream = DoubleStream.of(1.0,2.0,...);
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.OptionalDouble;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;
import java.util.stream.LongStream;

public class Test {
    public static void main(String[] args) {
        // 创建 Stream 对象
        IntStream intStream = IntStream.of(1, 2, 3, 4);
        LongStream longStream = LongStream.of(1L, 2L, 3L, 4L);
        DoubleStream doubleStream = DoubleStream.of(1.0, 2.0, 3.0, 4.0);

        // 终结操作
        OptionalDouble optional = intStream.average();
        optional.ifPresent(System.out::println); // 2.5
        optional = longStream.average();
        optional.ifPresent(System.out::println); // 2.5
        optional = doubleStream.average();
        optional.ifPresent(System.out::println); // 2.5
    }

}
```

#### 2.5.7.3 常用 API

* 将基本流转为 Obj 流：

```java
Stream<U> stream = intStream.mapToObj(IntFunction<? extends U> mapper)
```

* 将基本流转换为对应的普通流（装箱）：

```java
Stream<Integer> stream = intStream.boxed();
```

* 求汇总统计数据，即：求最值（最大值和最小值）、求和、平均值、总数：

```java
IntSummaryStatistics summaryStatistics = intStream.summaryStatistics();
```

* 求和：

```java
int sum = intStream.sum();
```

* 求最大值：

```java
OptionalInt optionalInt = intStream.max();
```

* 求最小值：

```java
OptionalInt optionalInt = intStream.min();
```

* 求平均值：

```java
OptionalDouble optionalDouble = intStream.average();
```



* 示例：

```java
package com.github.optinal;

import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        IntStream intStream = IntStream.of(97, 98, 99);

        Stream<String> stringStream = intStream.mapToObj(Character::toString);

        stringStream.forEach(System.out::println);
    }
}
```



* 示例：

```java
package com.github.optinal;

import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        IntStream intStream = "abc".chars();

        Stream<String> stringStream = intStream.mapToObj(Character::toString);

        stringStream.forEach(System.out::println);

    }
}
```



* 示例：

```java
package com.github.optinal;

import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {

        IntStream intStream = IntStream.of(1, 2, 3);

        Stream<Integer> stream = intStream.boxed();

        stream.forEach(System.out::println);
    }
}
```



* 示例：

```java
package com.github.optinal;

import java.util.IntSummaryStatistics;
import java.util.stream.IntStream;

public class Test {
    public static void main(String[] args) {

        IntStream intStream = IntStream.of(1, 2, 3);

        IntSummaryStatistics summaryStatistics = intStream.summaryStatistics();

        double average = summaryStatistics.getAverage();
        System.out.println("平均值：" + average); // 平均值：2.0
        long sum = summaryStatistics.getSum();
        System.out.println("和：" + sum); // 和：6
        long count = summaryStatistics.getCount();
        System.out.println("总数：" + count); // 总数：3
        int max = summaryStatistics.getMax();
        System.out.println("最大值：" + max); // 最大值：3
        int min = summaryStatistics.getMin();
        System.out.println("最小值：" + min); // 最小值：1
    }
}

```

## 2.6 Stream 特性

- ① Stream 自己不会存储元素。

- ② Stream 不会改变源对象，每次处理读会返回一个持有结果的新的 Stream 。

- ③ Stream 操作是延迟执行的，意味着会等到需要结果的时候才执行。



# 第三章：并行流（⭐）

## 3.1 概述

* 之前接触过的流都是`串行流`，即：使用流处理数据时，底层是使用`单线程`来处理流中的元素。

```java
package com.github.lambda.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 串行流
        Stream<Integer> stream = Stream.of(1, 2, 3, 4); // [!code highlight]

        stream.forEach(System.out::println);
    }

}
```

* 但是，Java 中还提供了`并行流`，即：使用流处理数据时，底层是使用`多线程`来处理流中的元素。

```java
package com.github.lambda.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 并行流
        Stream<Integer> stream = Stream.of(1, 2, 3, 4).parallel();

        stream.forEach(System.out::println);
    }

}
```

* 可以通过`stream.isParallel()`方法来判断一个流是串行流还是并行流：

```java
package com.github.lambda.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 串行流
        Stream<Integer> stream = Stream.of(1, 2, 3, 4);
        boolean parallel = stream.isParallel();
        System.out.println(parallel); // false

        // 并行流
        Stream<Integer> stream2 = Stream
                .of(1, 2, 3, 4)
                .parallel();
        boolean parallel2 = stream2.isParallel();
        System.out.println(parallel2); // true
    }

}
```

> [!NOTE]
>
> * ① 当数据量`小`的时候，使用`并行流`，无异于“杀鸡焉用牛刀”，反而降低了效率（并行流需要将任务拆分到多个线程中执行，最后再合并结果，中间会涉及到`线程的创建开销`、`任务的拆分和合并开销`以及`线程上下文切换`等）。
> * ② 当数据量`大`的时候，使用`串行流`，无异于“杯水车薪”，不仅效率低下，还可能造成资源浪费与响应延迟。

## 3.2 构建并行流

* 使用`Stream 对象`调用 `parallel()` 方法可以将普通流转换为并行流：

```java
Stream<?> stream2 = stream.parallel()
```

* 使用`Collection 对象`调用`parallelStream()`方法直接创建并行流：

```java
Stream<?> stream2 = list.parallel()
```

> [!NOTE]
>
> 通过`stream.sequential()`可以将`并行流`转为`串行流`！！！



* 示例：

```java
package com.github.lambda.optinal;

import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        // 串行流
        Stream<Integer> stream = Stream.of(1, 2, 3, 4);
        boolean parallel = stream.isParallel();
        System.out.println(parallel); // false

        // 并行流
        Stream<Integer> stream2 = Stream
                .of(1, 2, 3, 4)
                .parallel();
        boolean parallel2 = stream2.isParallel();
        System.out.println(parallel2); // true
    }

}
```



* 示例：

```java
package com.github.lambda.optinal;

import java.util.List;
import java.util.stream.Stream;

public class Test2 {
    public static void main(String[] args) {
        List<Integer> list = List.of(1, 2, 3, 4, 5);

        Stream<Integer> stream = list.parallelStream();
        System.out.println(stream.isParallel()); // true
    }

}
```

## 3.3 证明并行流底层采用了多线程技术

* 本人的台式机的 CPU 是 24 核，如下所示：

> [!NOTE]
>
> 在不浪费电脑资源的情况下，为了达到最佳吞吐量，建议`线程数 = CPU核心数`，即：有 4 个工人（线程），要搬一堆砖（任务）：
>
> * ① 只安排 1 个人干活，效率低。
> * ② 安排 4 个人同时干，就能最快完成。
> * ③ 安排 8 个人，反而可能因为争抢工具而变慢。
> * ④ ...

![](./assets/5.png)

* 研究并行流的一个好的切入点就是`收集`，如下所示：

```java
R r = stream.collect(Collector<? super T, A, R> collector);
```

* 之前，我们都是建议使用 JDK 内部实现的收集器。

```java
Collector<T, ?, List<T>> collector = Collectors.toList();
Collector<T, ?, Set<T>> collector = Collectors.toSet();
...
```

* 但是，JDK 内部实现的收集器，调试不方便，我们将采用`自定义收集器`，即：调用`Collector.of(x,x,x,x)`方法。

```java
public static<T, A, R> Collector<T, A, R> of(
    Supplier<A> supplier,
    BiConsumer<A, T> accumulator,
    BinaryOperator<A> combiner,
    Function<A, R> finisher,
    Characteristics... characteristics) {
    ...
}

enum Characteristics {

    CONCURRENT,

    UNORDERED,

    IDENTITY_FINISH
}
```

> [!NOTE]
>
> * ① supplier：如何创建容器。
> * ② accumulator：累加器，即：如何将流中的元素添加到容器中。
> * ③ combiner：合并器，即：如何将多个容器中的数据合并到一起。
> * ④ finisher：收尾器，即：容器是否需要转换，如：List --> Set 等。
> * ④ characteristics：特性，可以有 1 个、多个，也可以一个都没有。
>   * CONCURRENT：收集器支持并发，即：容器是线程安全的。
>   * IDENTITY_FINISH：收集器是否需要收尾。
>   * UNORDERED：收集器不保证收集顺序。

> [!NOTE]
>
> 如果不传递 characteristics，默认行为：
>
> * ① 容器不支持并发，即：在并行流中每次都会创建新的中间容器，而不是并发修改同一个容器。
> * ② 收集器保证收集顺序。
> * ③ 收集器需要收尾。

* 那么自定义收集器的逻辑就是这样的，如下所示：

```java
package com.github.lambda.optinal;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {

        List<Integer> collect = Stream
                .of(1, 2, 3, 4, 5)
                .parallel()
                .collect(Collector.of(
                        () -> new ArrayList<Integer>(), // 如何创建容器
                        ArrayList::add, // 如何向容器中添加数据
                        (list1, list2) -> { // 如何合并两个容器中的数据
                            list1.addAll(list2);
                            return list1;
                        },
                        list -> list // 收尾
                ));

        System.out.println(collect);

    }

}
```

* 此时，我们可以添加一些调试代码，如下所示：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {

        List<Integer> collect = Stream
                .of(1, 2, 3, 4)
                .parallel()
                .collect(Collector.of(
                        () -> { // 如何创建容器
                            System.out.printf("%-12s %s%n", simple(), "create");
                            return new ArrayList<Integer>();
                        },
                        (list, x) -> { // 如何向容器中添加数据
                            List<Integer> old = new ArrayList<>(list);
                            list.add(x);
                            System.out.printf("%-12s %s.add(%d)=>%s%n", simple(), old, x, list);

                        },
                        (list1, list2) -> { // 如何合并两个容器中的数据
                            List<Integer> old = new ArrayList<>(list1);
                            list1.addAll(list2);
                            System.out.printf("%-12s %s.add(%s)=>%s%n", simple(), old, list2, list1);
                            return list1;
                        },
                        list -> { // 收尾
                            System.out.printf("%-12s finish:%s=>%s%n", simple(), list, list);
                            return list;
                        }
                ));

        System.out.println(collect);

    }

    private static String simple() {
        String name = Thread
                .currentThread()
                .getName();
        int idx = name.indexOf("worker");
        if (idx > 0) {
            return name.substring(idx);
        }
        return name;
    }

}
```

```txt [cmd 控制台]
main         create
worker-3     create
worker-3     [].add(4)=>[4]
worker-1     create
worker-2     create
worker-1     [].add(2)=>[2]
main         [].add(3)=>[3]
worker-2     [].add(1)=>[1]
main         [3].add([4])=>[3, 4]
worker-2     [1].add([2])=>[1, 2]
worker-2     [1, 2].add([3, 4])=>[1, 2, 3, 4]
main         finish:[1, 2, 3, 4]=>[1, 2, 3, 4]
[1, 2, 3, 4]
```

:::

* 其动态图，如下所示：

![](./assets/6.svg)

* 我们也可以将数据继续增加，看创建的容器数量是否等于线程数，如下所示：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {

        List<Integer> collect = Stream
                .of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25)
                .parallel()
                .collect(Collector.of(
                        () -> { // 如何创建容器
                            System.out.printf("%-12s %s%n", simple(), "create");
                            return new ArrayList<Integer>();
                        },
                        (list, x) -> { // 如何向容器中添加数据
                            List<Integer> old = new ArrayList<>(list);
                            list.add(x);
                            System.out.printf("%-12s %s.add(%d)=>%s%n", simple(), old, x, list);

                        },
                        (list1, list2) -> { // 如何合并两个容器中的数据
                            List<Integer> old = new ArrayList<>(list1);
                            list1.addAll(list2);
                            System.out.printf("%-12s %s.add(%s)=>%s%n", simple(), old, list2, list1);
                            return list1;
                        },
                        list -> { // 收尾
                            System.out.printf("%-12s finish:%s=>%s%n", simple(), list, list);
                            return list;
                        }
                ));

        System.out.println(collect);

    }

    private static String simple() {
        String name = Thread
                .currentThread()
                .getName();
        int idx = name.indexOf("worker");
        if (idx > 0) {
            return name.substring(idx);
        }
        return name;
    }

}
```

```txt [cmd 控制台]
main         create
worker-20    create
worker-22    create
worker-19    create
worker-21    create
worker-21    [].add(15)=>[15]
worker-18    create
worker-14    create
worker-13    create
worker-16    create
worker-16    [].add(12)=>[12]
worker-17    create
worker-9     create
worker-9     [].add(22)=>[22]
worker-15    create
worker-11    create
worker-12    create
worker-8     create
worker-8     [].add(7)=>[7]
worker-10    create
worker-7     create
worker-7     [].add(11)=>[11]
worker-5     create
worker-4     create
worker-3     create
worker-3     [].add(23)=>[23]
worker-6     create
worker-6     [].add(19)=>[19]
worker-2     create
worker-2     [].add(4)=>[4]
worker-1     create
worker-3     [22].add([23])=>[22, 23]
worker-4     [].add(14)=>[14]
worker-5     [].add(20)=>[20]
worker-7     [11].add([12])=>[11, 12]
worker-10    [].add(18)=>[18]
worker-12    [].add(9)=>[9]
worker-11    [].add(25)=>[25]
worker-15    [].add(2)=>[2]
worker-17    [].add(10)=>[10]
worker-13    [].add(13)=>[13]
worker-14    [].add(21)=>[21]
worker-18    [].add(24)=>[24]
worker-21    create
worker-19    [].add(1)=>[1]
worker-22    [].add(6)=>[6]
worker-20    [].add(3)=>[3]
worker-23    create
worker-23    [].add(5)=>[5]
main         [].add(16)=>[16]
worker-23    [5].add([6])=>[5, 6]
worker-20    [2].add([3])=>[2, 3]
worker-21    [].add(17)=>[17]
worker-18    [24].add([25])=>[24, 25]
worker-14    [20].add([21])=>[20, 21]
worker-17    [10].add([11, 12])=>[10, 11, 12]
worker-4     [14].add([15])=>[14, 15]
worker-1     [].add(8)=>[8]
worker-4     [13].add([14, 15])=>[13, 14, 15]
worker-14    [19].add([20, 21])=>[19, 20, 21]
worker-18    [22, 23].add([24, 25])=>[22, 23, 24, 25]
worker-21    [17].add([18])=>[17, 18]
worker-20    [1].add([2, 3])=>[1, 2, 3]
worker-23    [4].add([5, 6])=>[4, 5, 6]
worker-21    [16].add([17, 18])=>[16, 17, 18]
worker-18    [19, 20, 21].add([22, 23, 24, 25])=>[19, 20, 21, 22, 23, 24, 25]
worker-1     [8].add([9])=>[8, 9]
worker-21    [13, 14, 15].add([16, 17, 18])=>[13, 14, 15, 16, 17, 18]
worker-23    [1, 2, 3].add([4, 5, 6])=>[1, 2, 3, 4, 5, 6]
worker-21    [13, 14, 15, 16, 17, 18].add([19, 20, 21, 22, 23, 24, 25])=>[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
worker-1     [7].add([8, 9])=>[7, 8, 9]
worker-1     [7, 8, 9].add([10, 11, 12])=>[7, 8, 9, 10, 11, 12]
worker-1     [1, 2, 3, 4, 5, 6].add([7, 8, 9, 10, 11, 12])=>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
worker-1     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].add([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25])=>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
main         finish:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]=>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
```

:::

> [!CAUTION]
>
> * ① 不会有线程安全问题，因为每个线程都是操作自己的容器，即使该容器是线程不安全的。
> * ② 线程安全问题的两个原因：在多线程环境下，多线程争抢同一资源。
> * ③ 现在虽然也在多线程环境下，但是每个线程操作自己的容器（即使容器是线程不安全的），当然不会有线程安全问题。

* 我们知道，如果默认情况下不传递 characteristics 参数，将会出现以下情况：
  * ① 收集器是否需要收尾（需要收尾）。
  * ② 收集器是否要保证顺序（默认保证）。
  * ③ 收集器内部的容器是否支持并发（默认不支持）。
* 现在，我们可以传递 characteristics 来改变其默认行为，但是如果传递 characteristics  是 CONCURRENT，那么容器就需要是并发容器了，如下所示：

::: code-group

```java [Test.java]
package com.github.lambda.optinal;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;
import java.util.stream.Collector;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {

        List<Integer> collect = Stream
                .of(1, 2, 3, 4)
                .parallel()
                .collect(Collector.of(
                        () -> { // 如何创建容器
                            System.out.printf("%-12s %s%n", simple(), "create");
                            return new Vector<Integer>();
                        },
                        (list, x) -> { // 如何向容器中添加数据
                            List<Integer> old = new ArrayList<>(list);
                            list.add(x);
                            System.out.printf("%-12s %s.add(%d)=>%s%n", simple(), old, x, list);

                        },
                        (list1, list2) -> { // 如何合并两个容器中的数据
                            List<Integer> old = new ArrayList<>(list1);
                            list1.addAll(list2);
                            System.out.printf("%-12s %s.add(%s)=>%s%n", simple(), old, list2, list1);
                            return list1;
                        },
                        list -> { // 收尾
                            System.out.printf("%-12s finish:%s=>%s%n", simple(), list, list);
                            return list;
                        },
                        Collector.Characteristics.IDENTITY_FINISH, // 不需要收尾
                        Collector.Characteristics.UNORDERED, // 不保证顺序
                        Collector.Characteristics.CONCURRENT // 容器需要支持并发
                ));

        System.out.println(collect);

    }

    private static String simple() {
        String name = Thread
                .currentThread()
                .getName();
        int idx = name.indexOf("worker");
        if (idx > 0) {
            return name.substring(idx);
        }
        return name;
    }

}

```

```txt [cmd 控制台]
main         create
main         [].add(3)=>[3, 1, 2, 4]
worker-3     [3, 1, 2].add(4)=>[3, 1, 2, 4]
worker-1     [3, 1].add(2)=>[3, 1, 2, 4]
worker-2     [3].add(1)=>[3, 1, 2, 4]
[3, 1, 2, 4]
```

:::

> [!NOTE]
>
> 目前并发流支持两种方案：
>
> * ① 默认 + 线程不安全的容器：占用的内存多，没有并发冲突。
> * ② Collector.Characteristics.CONCURRENT + Collector.Characteristics.UNORDERED + 线程安全的容器：占用的内存少，但是多个线程将数据向同一个容器中收集，在数据量大的时候，会产生很多并发冲突，从而可能会影响程序的性能。

* 其实，在 JDK 底层的收集器中，也有采用线程安全的容器来收集流中元素的，如下所示：

![](./assets/7.png)



# 第四章：效率（⭐）

## 4.1 概述

* 本次将采用 JMH 来进行基准测试，并使用 Maven 作为构建工具。

```xml
<dependency>
  <groupId>org.openjdk.jmh</groupId>
  <artifactId>jmh-core</artifactId>
  <version>1.35</version>
</dependency>
<dependency>
  <groupId>org.openjdk.jmh</groupId>
  <artifactId>jmh-generator-annprocess</artifactId>
  <version>1.35</version>
  <scope>provided</scope>
</dependency>
```

## 4.2 求和

### 4.2.1 概述

* 本次将采用四种方式来进行求和：
  * ① 普通 for 循环对 int 进行求和，即：primitive() 方法。
  * ② IntStream 对 int 进行求和，即：intStream() 方法。
  * ③ 普通 for 循环对 Integer 进行求和，即：boxed() 方法。
  * ④ Stream 对 Integer 进行求和，即：stream() 方法。

* 测试的代码，如下所示：

```java
package com.github;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.results.format.ResultFormatType;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Thread)
@Fork(3)
@Warmup(iterations = 2, time = 1)
@Measurement(iterations = 5, time = 1)
public class SumTest {

    private static final int SIZE = 100; // [!code highlight]
    private int[] numbers;
    private List<Integer> numberList;

    @Setup
    public void setup() {
        numbers = new int[SIZE];
        for (int i = 0; i < SIZE; i++) {
            numbers[i] = i;
        }
        numberList = new ArrayList<>(SIZE);
        for (int i = 0; i < SIZE; i++) {
            numberList.add(i);
        }
    }

    /**
     * 使用循环对 int 求和
     */
    @Benchmark
    public int primitive() {
        int sum = 0;
        for (int number : numbers) {
            sum += number;
        }
        return sum;
    }

    /**
     * 使用循环对 Integer 求和
     */
    @Benchmark
    public int boxed() {
        int sum = 0;
        for (Integer i : numberList) {
            sum += i;
        }
        return sum;
    }

    /**
     * 使用 Stream 对 Integer 求和
     */
    @Benchmark
    public int stream() {
        return numberList
                .stream()
                .reduce(0, Integer::sum);
    }

    /**
     * 使用 IntStream 对 int 求和
     */
    @Benchmark
    public int intStream() {
        return IntStream
                .of(numbers)
                .sum();
    }

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
                .include(SumTest.class.getSimpleName())
                .result("result.json")
                .resultFormat(ResultFormatType.JSON)
                .build();

        new Runner(opt).run();
    }

}
```

### 4.2.2 测试一

* 元素个数是 100 ，JMH 的测试结果，如下所示：

| Benchmark | Mode | Cnt  | Score (ns/op) | Error (ns/op) | Units |
| --------- | ---- | ---- | ------------- | ------------- | ----- |
| boxed     | avgt | 15   | 36.499        | ± 2.250       | ns/op |
| intStream | avgt | 15   | 45.256        | ± 3.838       | ns/op |
| primitive | avgt | 15   | 14.730        | ± 0.227       | ns/op |
| stream    | avgt | 15   | 297.025       | ± 6.837       | ns/op |

* 其柱状图，如下所示：

![](./assets/8.png)

### 4.2.3 测试二

* 元素个数是 10000，JMH 的测试结果，如下所示：

| Benchmark | Mode | Cnt  | Score (ns/op) | Error (ns/op) | Units |
| --------- | ---- | ---- | ------------- | ------------- | ----- |
| boxed     | avgt | 15   | 3168.356      | ± 44.983      | ns/op |
| intStream | avgt | 15   | 2126.682      | ± 24.216      | ns/op |
| primitive | avgt | 15   | 2098.360      | ± 37.273      | ns/op |
| stream    | avgt | 15   | 26270.320     | ± 813.071     | ns/op |

* 其柱状图，如下所示：

![](./assets/9.png)

### 4.2.4 测试三

* 元素个数是 1000000，JMH 的测试结果，如下所示：

| Benchmark | Mode | Cnt  | Score (ns/op) | Error (ns/op) | Units |
| --------- | ---- | ---- | ------------- | ------------- | ----- |
| boxed     | avgt | 15   | 389805.446    | ± 21175.126   | ns/op |
| intStream | avgt | 15   | 216711.061    | ± 2947.919    | ns/op |
| primitive | avgt | 15   | 210447.980    | ± 4784.173    | ns/op |
| stream    | avgt | 15   | 3564449.498   | ± 620627.379  | ns/op |

* 其柱状图，如下所示：

![](./assets/10.png)

### 4.2.5 总结

* ① 做数值计算的时候，应该避免使用普通流（Stream），其性能和其它几种相比，慢了很多。
* ② 做数值计算的时候，优先挑选基本流（IntStream 等），在数据量较大的时候，其性能已经接近普通的 for 循环。

## 4.3 求最大值

### 4.3.1 概述

* 本次将采用四种方式来进行求和：

  * ① 普通 for 循环对 int 数组求最大值，即：primitive() 方法。

  * ② 串行流对 int 数组求最大值，即：sequence() 方法。

  * ③ 并行流对 int 数组求最大值，即：parallel() 方法。

  * ④ 自定义多线程对 int 数组求最大值，即：custom() 方法。

* 测试的代码，如下所示：

```java
package com.github;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.results.format.ResultFormatType;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;
import java.util.stream.IntStream;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Thread)
@Fork(3)
@Warmup(iterations = 2, time = 1)
@Measurement(iterations = 5, time = 1)
public class ParallelTest {

    private static final int SIZE = 100; // [!code highlight]
    private int[] numbers;

    private ExecutorService service;

    @Setup
    public void setup() {
        numbers = new int[SIZE];
        for (int i = 0; i < SIZE; i++) {
            numbers[i] = ThreadLocalRandom
                    .current()
                    .nextInt(100_000);
        }

        service = Executors.newFixedThreadPool(
                Math.max(1, Runtime
                        .getRuntime()
                        .availableProcessors()));
    }

    @TearDown
    public void tearDown() {
        service.shutdown();
    }

    /**
     * 使用循环求最大值
     */
    @Benchmark
    public int primitive() {
        int max = 0;
        for (int number : numbers) {
            if (number > max) {
                max = number;
            }
        }
        return max;
    }

    /**
     * 使用并行流对求最大值
     */
    @Benchmark
    public int parallel() {
        return IntStream
                .of(numbers)
                .parallel()
                .max()
                .orElse(0);
    }

    /**
     * 使用串行流求最大值
     */
    @Benchmark
    public int sequence() {
        return IntStream
                .of(numbers)
                .max()
                .orElse(0);
    }

    /**
     * 自定义多线程并行求最大值
     */
    @Benchmark
    public int custom() throws ExecutionException, InterruptedException {
        int SIZE = numbers.length;
        int threadCount = Runtime.getRuntime().availableProcessors();
        int chunk = (SIZE + threadCount - 1) / threadCount;

        List<Future<Integer>> futures = new ArrayList<>(threadCount);
        for (int start = 0; start < SIZE; start += chunk) {
            int end = Math.min(start + chunk, SIZE);
            int finalStart = start;
            futures.add(service.submit(() -> {
                int localMax = numbers[finalStart];
                for (int i = finalStart + 1; i < end; i++) {
                    if (numbers[i] > localMax) localMax = numbers[i];
                }
                return localMax;
            }));
        }

        int max = Integer.MIN_VALUE;
        for (Future<Integer> f : futures) {
            max = Math.max(max, f.get());
        }
        return max;
    }

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
                .include(ParallelTest.class.getSimpleName())
                .result("result.json")
                .resultFormat(ResultFormatType.JSON)
                .build();

        new Runner(opt).run();
    }

}

```

### 4.3.2 测试一

* 元素个数是 100 ，JMH 的测试结果，如下所示：

| Benchmark | Mode | Cnt  | Score (ns/op) | Error (ns/op) | Units |
| --------- | ---- | ---- | ------------- | ------------- | ----- |
| custom    | avgt | 15   | 11260.155     | ± 234.584     | ns/op |
| parallel  | avgt | 15   | 26443.196     | ± 222.938     | ns/op |
| primitive | avgt | 15   | 19.235        | ± 2.833       | ns/op |
| sequence  | avgt | 15   | 63.980        | ± 1.275       | ns/op |

* 其柱状图，如下所示：

![](./assets/11.png)

### 4.3.3 测试二

* 元素个数是 10000，JMH 的测试结果，如下所示：

| Benchmark | Mode | Cnt  | Score (ns/op) | Error (ns/op) | Units |
| --------- | ---- | ---- | ------------- | ------------- | ----- |
| custom    | avgt | 15   | 17472.194     | ± 544.914     | ns/op |
| parallel  | avgt | 15   | 27993.134     | ± 347.412     | ns/op |
| primitive | avgt | 15   | 1973.060      | ± 276.455     | ns/op |
| sequence  | avgt | 15   | 4243.904      | ± 115.034     | ns/op |

* 其柱状图，如下所示：

![](./assets/12.png)

### 4.3.4 测试三

* 元素个数是 1000000，JMH 的测试结果，如下所示：

| Benchmark | Mode | Cnt  | Score (ns/op) | Error (ns/op) | Units |
| --------- | ---- | ---- | ------------- | ------------- | ----- |
| custom    | avgt | 15   | 78837.747     | ± 4017.790    | ns/op |
| parallel  | avgt | 15   | 73449.199     | ± 965.975     | ns/op |
| primitive | avgt | 15   | 166560.093    | ± 12344.487   | ns/op |
| sequence  | avgt | 15   | 428516.639    | ± 4867.386    | ns/op |

* 其柱状图，如下所示：

![](./assets/13.png)

### 4.3.5 总结

* ① 并行流相对普通流（串行流）来说，是使用多线程实现分而治之，写法更简洁。
* ② 并行流只有在数据量非常大的情况下，才能充分发力；如果数据量很小，还不如普通流（串行流）。

## 4.4 并行收集

### 4.4.1 概述

* 本次将采用五种方式来进行求和：
  * ① 普通 for 循环 + Map.merge() 方法进行收集，即：loopMerge() 方法。
  * ② 普通 for 循环 + Map.computeIfAbsent() 方法进行收集，即：loopComputeIfAbsent() 方法。
  * ③ 单线程进行收集，即：sequence() 方法。
  * ④ 多线程没有使用并发容器进行收集，即：parallelNoConcurrent() 方法。
  * ⑤ 多线程使用了并发容器进行收集，即：parallelConcurrent() 方法。
* 测试的代码，如下所示：

```java
package com.github;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.results.format.ResultFormatType;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;

import static java.util.stream.Collectors.*;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Thread)
@Fork(3)
@Warmup(iterations = 2, time = 1)
@Measurement(iterations = 5, time = 1)
public class ConcurrentTest {

    private static final int SIZE = 100 ; // [!code highlight]
    private int[] numbers;

    @Setup
    public void setup() {
        numbers = new int[SIZE];
        for (int i = 0; i < SIZE; i++) {
            numbers[i] = ThreadLocalRandom
                    .current()
                    .nextInt(100_000);
        }
    }

    /**
     * 不可变的思想，每次都产生新的值，然后将新的值覆盖旧的值
     */
    @Benchmark
    public Map<Integer, Integer> loopMerge() {
        Map<Integer, Integer> map = new HashMap<>();
        for (int number : numbers) {
            // 如果 Map 中没有该元素，则设置为 1
            // 如果 Map 中已经有了该元素，则在上一次的基础上累加
            map.merge(number, 1, Integer::sum);
        }
        return map;
    }

    /**
     * 可变的思想，值始终都是同一个 AtomicInteger 对象，变化的是 AtomicInteger 对象内部维护的数据
     */
    @Benchmark
    public Map<Integer, AtomicInteger> loopComputeIfAbsent() {
        Map<Integer, AtomicInteger> map = new HashMap<>();
        for (int number : numbers) {
            // 如果 Map 中没有该元素，则设置 AtomicInteger 对象
            // 如果 Map 中有该元素，则将 AtomicInteger 对象内部维护的数据 + 1 ，并设置新的 AtomicInteger 对象
            map.computeIfAbsent(number, k -> new AtomicInteger()).getAndIncrement();
        }
        return map;
    }

    /**
     * 单线程进行收集：数字相同的分到一组，然后计算总数
     */
    @Benchmark
    public Map<Integer, Long> sequence() {

        return Arrays.stream(numbers).boxed()
                .collect(groupingBy(Function.identity(), counting()));
    }

    /**
     * 多线程没有使用并发容器进行收集：数字相同的分到一组，然后计算总数
     */
    @Benchmark
    public Map<Integer, Long> parallelNoConcurrent() {
        return Arrays
                .stream(numbers).boxed()
                .parallel()
                .collect(groupingBy(Function.identity(), counting()));
    }

    /**
     * 多线程使用了并发容器进行收集：数字相同的分到一组，然后计算总数
     */
    @Benchmark
    public ConcurrentMap<Integer, Long> parallelConcurrent() {
        return Arrays.stream(numbers).boxed()
                .parallel()
                .collect(groupingByConcurrent(Function.identity(), counting()));
    }

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
                .include(ConcurrentTest.class.getSimpleName())
                .result("result.json")
                .resultFormat(ResultFormatType.JSON)
                .build();

        new Runner(opt).run();
    }

}
```

### 4.4.2 测试一

* 元素个数是 100 ，JMH 的测试结果，如下所示：

| Benchmark            | Mode | Cnt  | Score (ns/op) | Error (ns/op) | Units |
| -------------------- | ---- | ---- | ------------- | ------------- | ----- |
| loopComputeIfAbsent  | avgt | 15   | 1393.343      | ± 16.304      | ns/op |
| loopMerge            | avgt | 15   | 1309.615      | ± 23.220      | ns/op |
| parallelConcurrent   | avgt | 15   | 43717.160     | ± 1222.181    | ns/op |
| parallelNoConcurrent | avgt | 15   | 46849.073     | ± 1216.722    | ns/op |
| sequence             | avgt | 15   | 1917.812      | ± 34.317      | ns/op |

* 其柱状图，如下所示：

![](./assets/14.png)

### 4.4.3 测试二

* 元素个数是 10000，JMH 的测试结果，如下所示：

| Benchmark            | Mode | Cnt  | Score (ns/op) | Error (ns/op) | Units |
| -------------------- | ---- | ---- | ------------- | ------------- | ----- |
| loopComputeIfAbsent  | avgt | 15   | 248265.562    | ± 6261.323    | ns/op |
| loopMerge            | avgt | 15   | 233238.904    | ± 4044.373    | ns/op |
| parallelConcurrent   | avgt | 15   | 972907.475    | ± 38201.105   | ns/op |
| parallelNoConcurrent | avgt | 15   | 900603.669    | ± 10417.127   | ns/op |
| sequence             | avgt | 15   | 344180.702    | ± 3509.143    | ns/op |

* 其柱状图，如下所示：

![](./assets/15.png)

### 4.4.4 测试三

* 元素个数是 1000000，JMH 的测试结果，如下所示：

| Benchmark            | Mode | Cnt  | Score (ns/op) | Error (ns/op)  | Units |
| -------------------- | ---- | ---- | ------------- | -------------- | ----- |
| loopComputeIfAbsent  | avgt | 15   | 22747731.784  | ± 1037569.797  | ns/op |
| loopMerge            | avgt | 15   | 24046232.969  | ± 3344665.621  | ns/op |
| parallelConcurrent   | avgt | 15   | 14564528.488  | ± 631837.077   | ns/op |
| parallelNoConcurrent | avgt | 15   | 65273342.194  | ± 1445866.723  | ns/op |
| sequence             | avgt | 15   | 47866137.524  | ± 17891085.447 | ns/op |

* 其柱状图，如下所示：

![](./assets/16.png)

### 4.4.5 总结

* ① sequence 是一个容器单线程收集，数据量少时性能占优。
* ② parallelNoConcurrent 是多个容器多线程并行收集，时间花费在合并容器上，性能最差。
* ③ parallelConcurrent 是一个容器多线程并发收集，在数据量大时性能较优。

## 4.5 方法调用

### 4.5.1 概述

* 本次将进行`正常方法调用`、`反射`、`MethodHandle`、`Lambda` 的性能对比。

### 4.5.2 性能测试

* 测试的代码，如下所示：

```java
package com.github;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.results.format.ResultFormatType;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.concurrent.TimeUnit;
import java.util.function.BiFunction;

@BenchmarkMode(Mode.Throughput)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Thread)
@Fork(3)
@Warmup(iterations = 2, time = 1)
@Measurement(iterations = 5, time = 1)
public class MethodHandleTest {

    static int add(int a, int b) {
        return a + b;
    }

    @Benchmark
    public int origin(){
        return add(1,2);
    }

    static Method method;
    static MethodHandle methodHandle;
    static {
        try {
            method = MethodHandleTest.class.getDeclaredMethod("add", int.class, int.class);
            methodHandle = MethodHandles
                    .lookup().unreflect(method);
        } catch (NoSuchMethodException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    @Benchmark
    public Object reflection() throws InvocationTargetException, IllegalAccessException {
        return method.invoke(null, 1, 2);
    }

    @Benchmark
    public Object method() throws Throwable {
        return methodHandle.invoke(1, 2);
    }

    @Benchmark
    public int lambda() {
        return test(Integer::sum, 1, 2);
    }

    static int test(BiFunction<Integer,Integer,Integer> function, int a, int b) {
        return function.apply(a,b);
    }

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
                .include(MethodHandleTest.class.getSimpleName())
                .result("result.json")
                .resultFormat(ResultFormatType.JSON)
                .build();

        new Runner(opt).run();
    }

}
```

* 测试结果，如下所示：

| Benchmark  | Mode  | Cnt  | Score | Error   | Units |
| ---------- | ----- | ---- | ----- | ------- | ----- |
| lambda     | thrpt | 15   | 3.978 | ± 0.069 | ops/s |
| method     | thrpt | 15   | 0.391 | ± 0.004 | ops/s |
| origin     | thrpt | 15   | 3.891 | ± 0.082 | ops/s |
| reflection | thrpt | 15   | 0.223 | ± 0.006 | ops/s |

> [!NOTE]
>
> * ① `thrpt`：吞吐量模式（每单位时间能执行多少次操作），数值越高，性能越好。
> * ② 在 Java 中，`Lambda表达式`已经被高度优化，性能和`正常方法调用`差不多，即：**Lambda 几乎没有运行时开销，和直接调用一样高效。**
> * ③ 在 Java 中，`反射`是最慢的，`MethodHandle`虽然比`反射`快一点，但是依然低于`正常方法调用`以及`Lambda表达式`。

> [!TIP]
>
> * ① 如果写框架或者需要动态调用方法，优先选择使用`MethodHandle`而非`反射`。
> * ② 如果做高性能关键路径调用，尽量使用`正常方法调用`或`Lambda表达式`。

