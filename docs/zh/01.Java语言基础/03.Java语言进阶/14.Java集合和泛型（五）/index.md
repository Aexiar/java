---
date: 2025-09-22 09:05:36
title: index
encrypt: false
permalink: /pages/f4079b
---
# 第一章：可变参数（⭐）

## 1.1 概述

* JDK5 提供了 `Varargs`（variable number of arguments）机制，允许直接定义能和多个实参相匹配的形参，从而可以用一种更简单的方式，来传递个数可变的实参。
* JDK5 之前采用数组形参来定义方法，传入多个同一类型的变量：

````java
/**
* @param a 普通参数
* @param args 数组参数
*/
public static void test(int a, String[] args){
    ...
}
````

* JDK5 之后，采用可变个数的形参来定义方法，传入多个同一类型的变量：

```java
/**
* @param a 普通参数
* @param args 可变参数
*/
public static void test(int a,String... args){
    ...
}
```

## 1.2 为什么出现可变参数？

* 需求：假设需要定义一个方法求和，该方法可以灵活的完成以下功能。

> [!NOTE]
>
> * ① 计算 2 个数据的和。
> * ② 计算 3 个数据的和。
> * ③ 计算 4 个数据的和。
> * ④ 计算 n 个数据的和。

* 如果没有可变参数，对于求 2 个数据的和等，我们是这么设计的：

```java
package com.github.collection3;

import java.util.stream.IntStream;

public class Test {
    
    /**
     * 求两个整数的和
     */
    public static int add(int a, int b) { // [!code highlight]
        return a + b;
    }

    /**
     * 求三个整数的和
     */
    public static int add(int a, int b, int c) { // [!code highlight]
        return a + b + c;
    }

    /**
     * 求四个整数的和
     */
    public static int add(int a, int b, int c, int d) { // [!code highlight]
        return a + b + c + d;
    }
    
    public static void main(String[] args) {
        System.out.println(add(1, 2)); // 3
        System.out.println(add(1, 2, 3)); // 6 
        System.out.println(add(1, 2, 3, 4)); // 10 
    }
    
}
```

* 对于计算 n 个数据的和，我们只能使用`数组`作为形参，如下所示：

```java
package com.github.collection3;

import java.util.stream.IntStream;

public class Test {

    /**
     * 求 n 个整数的和
     */
    public static int add(int[] arr) { // [!code highlight]
        return IntStream
                .of(arr)
                .sum();
    }

    public static void main(String[] args) {
        System.out.println(add(new int[]{1, 2, 3, 4, 5})); // 15

    }
}
```

* 但是，在 JDK5 推出了可变参数之后，我们可以这么做：

```java
package com.github.collection3;

import java.util.stream.IntStream;

public class Test {

    /**
     * 求n个整数的和
     */
    public static int add(int... arr) { // [!code highlight]
        return IntStream
                .of(arr)
                .sum();
    }

    public static void main(String[] args) {
        System.out.println(add(1, 2, 3, 4, 5)); // 15
    }
}
```

## 1.3 可变参数细节

* 语法：

```java
权限访问修饰符 返回值类型 方法名(数据类型... 参数名){
    ...
}
```

> [!NOTE]
>
> * ① 可变参数指的是方法中形参的个数是可以发生变化的，可以是 0、1、2 ...
> * ② 可变个数形参的方法和同名的方法之间，彼此构成方法重载。
> * ③ 可变参数的底层就是数组，只不过不需要我们自己创建，Java 会帮我们创建好（在方法内部，我们可以像处理数组一样访问它）。
> * ④ 在方法的形参中，如果除了可变参数之外，还有其他的形参，那么可变参数需要写在最后。
> * ⑤ 在方法的形参中，有且只能有一个可变参数。



* 示例：

```java
package com.github.collection3;

import java.util.stream.IntStream;

public class Test {

    /**
     * 求n个整数的和
     */
    public static int add(int... arr) {
        return IntStream
                .of(arr)
                .sum();
    }

    public static void main(String[] args) {
        System.out.println(add(1, 2, 3, 4, 5)); // 15
        System.out.println(add(new int[]{1, 2, 3, 4, 5})); // 15
    }
}
```



# 第二章：Collections

## 2.1 概述

* 我们之前学习过`工具类`，即：工具类就是帮助我们做一些事情，但是不描述任何事物的类。

- `JavaBean 类`、`测试类`和`工具类`的区别，如下所示：

| 类型        | 描述                                                         | 举例                                    |
| :---------- | :----------------------------------------------------------- | :-------------------------------------- |
| JavaBean 类 | 用来描述一类事物的类。                                       | Student Teacher Dog Cat                 |
| 测试类      | 用来检查其他类是否书写正确，带有 main 方法的类，是程序的入口。 | StudentTest TeacherTest DogTest CatTest |
| 工具类      | 不是用来描述一类事物的，而是帮助我们做一些事情的类。         | Math Arrays                             |

* 工具类的编写规则之一：类名需要见名知意。

::: code-group

```java [Math.java]
public class Math {
    
}
```

```java [ArrayUtil.java]
public class ArrayUtil {
    
}
```

:::

* 工具类的编写规则之二：私有化构造方法。

```java
public class ArrayUtil {
    
    private ArrayUtil(){} // [!code highlight]

}
```

* 工具类的编写规则之三：方法定义为静态，即：对外提供静态方法。

```java
public class ArrayUtil {
    
    private ArrayUtil(){} 
    
    public static int getMax(...) {}  // [!code highlight]
    
    public static int getMin(...) {}  // [!code highlight]
    
    public static int getSum(...) {}  // [!code highlight]
    
    public static int getAvg(...) {}  // [!code highlight]

}
```

* 而 Collections 也是工具类，源码如下所示：

```java
package java.util;

/** 
* @since   1.2
*/
public class Collections {
    
    private Collections() {}
    
    public static <T extends Comparable<? super T>> void sort(List<T> list) {
        list.sort(null);
    }
    
    public static <T> void sort(List<T> list, Comparator<? super T> c) {
        list.sort(c);
    }
    
    ...
    
}
```

> [!NOTE]
>
> * ① Collections 是一个操作 Set、Map、List 等集合的工具类。
> * ② Collections 中提供了一系列的静态的方法对集合元素进行排序、查询和修改等操作，还提供了对集合对象设置不可变、对集合对象实现同步控制等方法。
> * ③ 在 JDK8 之前，Java 是建议将通用的方法抽取到工具类中（JDK 也是这么做的）。
> * ④ 在 JDK8 之后，之前的方式会导致类膨胀，而接口又提供了默认方法功能，所以很多工具类的方法已经迁移到了接口中（Stream API）。

## 2.2 常用 API

### 2.2.1 批量添加元素

* 向单列集合中批量添加元素：

```java
public static <T> boolean addAll(Collection<? super T> c, T... elements) {}
```



* 示例：

::: code-group

```java [Test.java]
package com.github.collection3;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        Collections.addAll(list, "张三", "李四", 
                           "王五", "赵六", "田七", "王八", "孙九");

        list.forEach(System.out::println);
    }
}
```

```txt [cmd 控制台]
张三
李四
王五
赵六
田七
王八
孙九
```

:::

### 2.2.2 打乱顺序

* 将 List 集合中的元素的顺序打乱：

```java
public static void shuffle(List<?> list) {}
```

```java
public static void shuffle(List<?> list, Random rnd) {}
```

> [!NOTE]
>
> shuffle 在英文中是`洗牌`的意思，所谓的`洗牌`就是将牌的顺序打乱！！！



* 示例：

::: code-group

```java [Test.java]
package com.github.collection3;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        Collections.addAll(list, "张三", "李四", 
                           "王五", "赵六", "田七", "王八", "孙九");
		
        // 打乱集合中元素的顺序
        Collections.shuffle(list);

        list.forEach(System.out::println);

    }
}
```

```txt [cmd 控制台]
王五
李四
赵六
王八
张三
田七
孙九
```

:::

### 2.2.3 排序

* 根据元素的自然顺序对 List 集合中的元素进行排序：

```java
public static <T extends Comparable<? super T>> void sort(List<T> list) {}
```

* 根据指定的 Comparator 对 List 集合元素进行排序：

```java
public static <T> void sort(List<T> list, Comparator<? super T> c) {}
```



* 示例：

::: code-group

```java [Test.java]
package com.github.collection3;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(4, 3, 2, 1, 5, 6);

        Collections.sort(list);

        list.forEach(System.out::println);

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
```

:::



* 示例：

::: code-group

```java [Test.java]
package com.github.collection3;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(4, 3, 2, 1, 5, 6);

        Collections.sort(list, Comparator.reverseOrder());

        list.forEach(System.out::println);

    }
}
```

```txt [cmd 控制台]
6
5
4
3
2
1
```

:::

### 2.2.4 二分查找

* 二分查找法查找指定的元素：

```java
public static <T> int binarySearch(List<? extends Comparable<? super T>> list, T key) {}
```

> [!NOTE]
>
> 二分查找法的前提条件是：集合中的元素是排序的（升序或降序）！！！



* 示例：

```java
package com.github.collection3;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);

        int index = Collections.binarySearch(list, 2);

        System.out.println(index); // 1
    }
}
```

### 2.2.5 获取最大元素

* 根据元素的自然顺序，返回给定集合中的最大元素：

```java
public static <T extends Object & Comparable<? super T>> T max(Collection<? extends T> coll) {}
```

* 根据指定的 Comparator，返回给定集合中的最大元素：

```java
public static <T> T max(Collection<? extends T> coll, Comparator<? super T> comp) {}
```



* 示例：

```java
package com.github.collection3;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(9, 1, 2, 3, 4, 5, 6, 7, 8);

        int max = Collections.max(list);

        System.out.println(max); // 9
    }
}
```



* 示例：

```java
package com.github.collection3;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(9, 1, 2, 3, 4, 5, 6, 7, 8);

        int max = Collections.max(list, Comparator.naturalOrder());

        System.out.println(max); // 9
    }
}
```

### 2.2.6 获取最小元素

* 根据元素的自然顺序，返回给定集合中的最小元素：

```java
public static <T extends Object & Comparable<? super T>> T min(Collection<? extends T> coll) {}
```

* 根据指定的 Comparator，返回给定集合中的最小元素：

```java
public static <T> T min(Collection<? extends T> coll, Comparator<? super T> comp) {}
```



* 示例：

```java
package com.github.collection3;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(9, 1, 2, 3, 4, 5, 6, 7, 8);

        int min = Collections.min(list);

        System.out.println(min); // 1
    }
}
```



* 示例：

```java
package com.github.collection3;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(9, 1, 2, 3, 4, 5, 6, 7, 8);

        int min = Collections.min(list, Comparator.naturalOrder());

        System.out.println(min); // 1
    }
}
```

### 2.2.7 获取元素出现次数

* 返回指定集合中指定元素出现的次数：

```java
public static int frequency(Collection<?> c, Object o) {}
```



* 示例：

```java
package com.github.collection3;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(9, 1, 1, 3, 1, 5, 6, 7, 8);

        int count = Collections.frequency(list, 1);
        
        System.out.println("count = " + count); // count = 3
    }
}
```

### 2.2.8 交换元素

* 交换集合中指定位置的元素：

```java
public static void swap(List<?> list, int i, int j) {}
```



* 示例：

```java
package com.github.collection3;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(9, 1, 1, 3, 1, 5, 6, 7, 8);

        Collections.swap(list, 0, list.size() - 1);

        System.out.println(list); // [8, 1, 1, 3, 1, 5, 6, 7, 9]
    }
}
```

### 2.2.9 填充

* 使用指定的元素填充集合：

```java
public static <T> void fill(List<? super T> list, T obj) {}
```



* 示例：

```java
package com.github.collection3;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(9, 1, 1, 3, 1, 5, 6, 7, 8);

        Collections.fill(list, 1);

        System.out.println(list); // [1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
}
```

## 2.3 同步控制方法

### 2.3.1 概述

* Collections 类提供了多个 synchronizedXxx() 方法，这些方法可以将指定集合包装成线程安全的集合。
* 上述的这些方法，可以解决多线程并发访问集合时的线程安全问题。

### 2.3.2 同步控制方法

* 将 Collection 集合转换为线程安全的集合：

```java
public static <T> Collection<T> synchronizedCollection(Collection<T> c) {}
```

* 将 Set 集合转换为线程安全的集合：

```java
public static <T> Set<T> synchronizedSet(Set<T> s) {}
```

* 将 List 集合转换为线程安全的集合：

```java
public static <T> List<T> synchronizedList(List<T> list) {}
```

* 将 Map 集合转换为线程安全的集合：

```java
public static <K,V> Map<K,V> synchronizedMap(Map<K,V> m) {}
```



* 示例：

```java
package com.github.collection3;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<String> list = Collections.synchronizedList(new ArrayList<>());

        list.add("aa");
        list.add("bb");
        list.add("cc");
        list.add("dd");
        list.add("ee");

        System.out.println("list = " + list); // list = [aa, bb, cc, dd, ee]
    }
}
```



# 第三章：不可变集合（⭐）

## 3.1 概述

* 所谓的`不可变集合`（Immutable Collections）：就是一旦创建后就不能再修改的集合对象，包括：不能修改集合的长度，不能修改集合的内容（增、删、改）。

> [!NOTE]
>
> 简单理解：如果我们让别人修改集合中的内容，就可以使用不可变集合。

* 其实，不可变集合在实际开发中具有广泛的应用场景，尤其在并发编程、安全性和代码设计等方面有显著优势。

## 3.2 为什么出现不可变集合？

* ① 并发编程（线程安全）：不可变集合天生线程安全，无需同步控制，避免竞争条件和加锁带来的性能问题。

```java
List<String> immutableList = List.of("a", "b", "c");
```

* ② 作为常量集合：定义静态常量集合（如枚举值、默认配置项等）

```java
public static final Set<String> SUPPORTED_FORMATS = Set.of("json", "xml", "yaml");
```

* ③ 防止被外部修改（封装性）：在对外暴露 API（如 getter 方法或返回数据结构）时，防止调用方修改集合。

```java
private final List<String> items = List.of("apple", "banana");

public List<String> getItems() {
    return items; // 返回不可变集合，调用方无法修改
}
```

* ④ 函数式编程场景：不可变集合与 Java 8+ 的函数式编程（Stream API、lambda 表达式）配合良好，更符合声明式风格。

```java
List<String> result = List.of("A", "B", "C")
    .stream()
    .map(String::toLowerCase)
    .toList(); // Java 16+ 中 toList() 返回的是不可变集合
```

## 3.3 创建不可变集合

* 在 List、Set、Map 接口中，存在静态方法 of，可以获取一个不可变的集合。

::: code-group

```java [List.java]
public interface List<E> extends Collection<E> {
    
    static <E> List<E> of(E... elements) {
        ...
    }
    
    ...
}
```

```java [Set.java]
public interface Set<E> extends Collection<E> {
    
    static <E> Set<E> of(E... elements) {
        ...
    }
    
    ...
}    
```

```java [Map.java]
public interface Map<K, V> {
	
    static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2, K k3, V v3, K k4, V v4, K k5, V v5,
                               K k6, V v6, K k7, V v7, K k8, V v8, K k9, V v9, K k10, V v10) {
        return new ImmutableCollections.MapN<>(k1, v1, k2, v2, k3, v3, k4, v4, k5, v5,
                                               k6, v6, k7, v7, k8, v8, k9, v9, k10, v10);
    }
    
    static <K, V> Map<K, V> ofEntries(Entry<? extends K, ? extends V>... entries) {
    	...
    }    
    
    ...
}
```

:::

> [!CAUTION]
>
> * ① 不可变集合一旦创建，不能添加、不能删除、不能修改。
> * ② 不可变集合创建之后，如果修改，会报`java.lang.UnsupportedOperationException`异常。
> * ③ `Map.of` 最多只能存储 `10` 对键值对对象，可以使用 `Map.ofEntries` 来代替（无限制）。
> * ④ 当我们创建 Set 集合或 Map 集合时，一定要保证 Set 集合中的元素唯一以及 Map 集合中的 key 唯一；否则，会报`java.lang.UnsupportedOperationException`或`java.lang.IllegalArgumentException`异常。



* 示例：

::: code-group

```java [ListRightTest.java]
package com.github.collection3;

import java.util.List;

public class ListRightTest {

    public static void main(String[] args) {
        // 一旦创建完毕之后，是无法进行修改的
        List<Integer> list = List.of(1, 2, 3, 4, 5);

        // ✅ 只能进行查询操作
        list.forEach(System.out::println);
    }
}
```

```java [ListErrorTest.java]
package com.github.collection3;

import java.util.List;

public class ListErrorTest {

    public static void main(String[] args) {
        // 一旦创建完毕之后，是无法进行修改的
        List<Integer> list = List.of(1, 2, 3, 4, 5);

        // ✅ 只能进行查询操作
        list.forEach(System.out::println);

        // ❌ 错误
        list.add(1); // [!code error]
    }
}
```

:::



* 示例：

::: code-group

```java [SetRightTest.java]
package com.github.collection3;

import java.util.Set;

public class SetRightTest {

    public static void main(String[] args) {
        // 一旦创建完毕之后，是无法进行修改的
        Set<Integer> set = Set.of(1, 2, 3, 4, 5);

        // ✅ 只能进行查询操作
        set.forEach(System.out::println);
        
    }
}
```

```java [SetErrorTest.java]
package com.github.collection3;

import java.util.Set;

public class SetErrorTest {

    public static void main(String[] args) {
        // 一旦创建完毕之后，是无法进行修改的
        // ❌ 错误，Set 集合中的元素不能重复
        Set<Integer> set = Set.of(1, 2, 3, 4, 5, 1); // [!code error]

        // 只能进行查询操作
        set.forEach(System.out::println);

    }
}
```

:::



* 示例：

::: code-group

```java [MapRightTest.java]
package com.github.collection3;

import java.util.Map;

public class MapRightTest {

    public static void main(String[] args) {
        // 一旦创建完毕之后，是无法进行修改的
        Map<Integer, String> map = Map.of(1, "张三", 2, "李四", 3, "王五");

        // ✅ 只能进行查询操作
        map.forEach((k, v) -> System.out.println(k + "=" + v));

    }
}
```

```java [MapErrorTest.java]
package com.github.collection3;

import java.util.Map;

public class MapErrorTest {

    public static void main(String[] args) {
        // 一旦创建完毕之后，是无法进行修改的
        // ❌ 错误，Map 集合中的 key 不能重复
        Map<Integer, String> map = Map.of(2, "李四", 3, "王五", 3, "王五"); // [!code error]

        // 只能进行查询操作
        map.forEach((k, v) -> System.out.println(k + "=" + v));

    }
}
```

:::

## 3.4 可变集合转为不可变集合

* 在 List、Set、Map 接口中，存在静态方法 copyOf，可以可变的集合转为不可变集合。

::: code-group

```java [List.java]
public interface List<E> extends Collection<E> {
    
    static <E> List<E> copyOf(Collection<? extends E> coll) {
        ...
    }
    
    ...
}
```

```java [Set.java]
public interface Set<E> extends Collection<E> {
    
    static <E> Set<E> copyOf(Collection<? extends E> coll) {
        ...
    }
    
    ...
}    
```

```java [Map.java]
public interface Map<K, V> {
	
    static <K, V> Map<K, V> copyOf(Map<? extends K, ? extends V> map) {
        ...
    }
        
    ...
}
```

:::



* 示例：

```java
package com.github.collection3;

import java.util.ArrayList;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        // 可变集合
        List<Integer> list = new ArrayList<>();

        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);

        // 将可变集合转为不可变集合
        final List<Integer> immutableList = List.copyOf(list);

        immutableList.forEach(System.out::println);
    }
}
```



* 示例：

```java
package com.github.collection3;

import java.util.HashSet;
import java.util.Set;

public class Test {

    public static void main(String[] args) {
        // 可变集合
        Set<Integer> set = new HashSet<>();

        set.add(1);
        set.add(2);
        set.add(3);
        set.add(4);
        set.add(1);

        // 将可变集合转为不可变集合
        Set<Integer> immutableSet = Set.copyOf(set);
        System.out.println(immutableSet);

    }
}
```



* 示例：

```java
package com.github.collection3;

import java.util.HashMap;
import java.util.Map;

public class Test {

    public static void main(String[] args) {
        // 可变集合
        Map<String, String> map = new HashMap<>();
        
        map.put("郭靖", "黄蓉");
        map.put("杨过", "小龙女");
        map.put("杨康", "穆念慈");
        map.put("张无忌", "赵敏");
        map.put("萧峰", "阿朱");
        map.put("令狐冲", "任盈盈");
        map.put("袁承志", "夏青青");
        
        // 将可变集合转为不可变集合
        Map<String, String> immutableMap = Map.copyOf(map);
        immutableMap.forEach((key, value) -> System.out.println(key + ":" + value));
    }
}
```

## 3.5 不可变集合转为可变集合

* 在 List、Set、Map 接口中子类中，存在构造函数，可以不可变的集合转为可变集合。

::: code-group

```java [ArrayList.java]
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable{
    
    public ArrayList(Collection<? extends E> c) {
        ...
    }
    
    ...
}
```

```java [HashSet.java]
public class HashSet<E>
    extends AbstractSet<E>
    implements Set<E>, Cloneable, java.io.Serializable {
    
    public HashSet(Collection<? extends E> c) {
       ...
    }
    
    ...
}    
```

```java [HashMap.java]
public class HashMap<K,V> extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable {
	
    public HashMap(Map<? extends K, ? extends V> m) {
        ...
    }
        
    ...
}
```

:::



* 示例：

```java
package com.github.collection3;

import java.util.ArrayList;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        // 不可变集合
        List<Integer> list = List.of(1, 2, 3, 4, 5);

        // 将不可变集合转为可变集合
        List<Integer> mutableList = new ArrayList<>(list);

        mutableList.add(6);
        mutableList.forEach(System.out::println);
    }
}
```



* 示例：

```java
package com.github.collection3;

import java.util.HashSet;
import java.util.Set;

public class Test {

    public static void main(String[] args) {
        // 不可变集合
        Set<Integer> set = Set.of(1, 2, 3, 4, 5);

        // 将不可变集合转为可变集合
        Set<Integer> mutableSet = new HashSet<>(set);

        mutableSet.add(6);
        mutableSet.forEach(System.out::println);
    }
}
```



* 示例：

```java
package com.github.collection3;

import java.util.HashMap;
import java.util.Map;

public class Test {

    public static void main(String[] args) {
        // 不可变集合
        Map<Integer, String> map = Map.of(1, "张三", 2, "李四", 3, "王五");

        // 将不可变集合转为可变集合
        Map<Integer, String> mutableMap = new HashMap<>(map);

        mutableMap.put(1, "黄蓉");
        mutableMap.put(2, "小龙女");
        mutableMap.put(3, "穆念慈");
        mutableMap.put(4, "赵敏");
        mutableMap.put(5, "阿朱");
        mutableMap.put(6, "任盈盈");
        mutableMap.put(7, "夏青青");

        mutableMap.forEach((k, v) -> System.out.println(k + "=" + v));
    }
}
```





# 第四章：综合练习

## 4.1 综合练习一

* 需求：班级里有 N 个学生，实现随机点名器。

> [!NOTE]
>
> 思路：
>
> * ① 通过 Random 类的 nextInt() 方法获取随机的 List 集合索引，并根据索引获取集合中的元素。
> * ② 将 List 集合中的元素进行打乱，然后获取第一个元素。



* 示例：

```java
package com.github.collection3;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Test {

    static Random random = new SecureRandom();

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        list.add("郭靖");
        list.add("黄蓉");
        list.add("杨过");
        list.add("小龙女");
        list.add("杨康");
        list.add("张无忌");
        list.add("赵敏");
        list.add("萧峰");
        list.add("令狐冲");
        list.add("任盈盈");
        list.add("夏青青");
        list.add("袁承志");

        int index = random.nextInt(list.size());

        System.out.println(list.get(index)); // 赵敏
    }
}
```



* 示例：

```java
package com.github.collection3;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class Test {

    static Random random = new SecureRandom();

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        list.add("郭靖");
        list.add("黄蓉");
        list.add("杨过");
        list.add("小龙女");
        list.add("杨康");
        list.add("张无忌");
        list.add("赵敏");
        list.add("萧峰");
        list.add("令狐冲");
        list.add("任盈盈");
        list.add("夏青青");
        list.add("袁承志");

        Collections.shuffle(list, random);

        System.out.println(list.get(0)); // 杨过
    }
}
```

## 4.2 综合练习二

* 需求：班级里有 N 个学生，实现随机点名器（要求：70% 的概率随机到男生，30% 的概率随机到女生）。

> [!NOTE]
>
> 思路：
>
> * ① 定义一个 List 集合（数组），里面存放`1111111000`（10 个数字），随机获取 List 集合中的元素：如果该元素是 1 ，就到男生组中随机抽取一个学生；如果该元素是 0 ，就到女生组中随机抽取一个学生。
> * ② 直接通过 Math.random() 获取随机数，如果随机数 <= 0.7 ，就从男生组中随机抽取一个学生；否则，就从女生组中随机抽取一个学生。



* 示例：

```java
package com.github.collection3;

import java.security.SecureRandom;
import java.util.List;
import java.util.Random;

public class Test {

    static Random random = new SecureRandom();

    public static void main(String[] args) {
        List<String> boyList = List.of("郭靖", "杨过", "杨康", "张无忌", 
                                       "萧峰", "令狐冲", "袁承志");
        List<String> grilList = List.of("黄蓉", "小龙女", "赵敏", 
                                        "任盈盈", "夏青青");

        List<Integer> list = List.of(1, 1, 1, 1, 1, 1, 1, 0, 0, 0);

        int num = list.get(random.nextInt(list.size()));
        System.out.println(num);

        String str;
        if (num == 1) {
            str = boyList.get(random.nextInt(boyList.size()));
        } else {
            str = grilList.get(random.nextInt(grilList.size()));
        }
        System.out.println(str);

    }
}
```



* 示例：

```java
package com.github.collection3;

import java.util.List;

public class Test {

    public static void main(String[] args) {
        List<String> boyList = List.of("郭靖", "杨过", "杨康", "张无忌",
                                       "萧峰", "令狐冲", "袁承志");
        List<String> grilList = List.of("黄蓉", "小龙女", "赵敏", 
                                        "任盈盈", "夏青青");

        double random = Math.random();

        if (random <= 0.7) {
            System.out.println(boyList.get((int) (random * boyList.size())));
        } else {
            System.out.println(grilList.get((int) (random * grilList.size())));
        }
    }
}
```

## 4.3 综合练习三

* 需求：定义一个 Map 集合，键用来表示省份（province），值用来表示市（city）；但是市有多个。

> [!NOTE]
>
> 省和市的关系，如下所示：
>
> | 省     | 市                                         |
> | ------ | ------------------------------------------ |
> | 江苏省 | 南京市，扬州市，苏州市，无锡市，常州市     |
> | 湖北省 | 武汉市，孝感市，十堰市，宜昌市，鄂州市     |
> | 河北省 | 石家庄市，唐山市，邢台市，保定市，张家口市 |



* 示例：

::: code-group

```java [Test.java]
package com.github.collection3;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Test {

    public static void main(String[] args) {
        Map<String, List<String>> map = new HashMap<>();

        List<String> list1 = List.of("南京市", "扬州市", "苏州市", "无锡市", "常州市");
        List<String> list2 = List.of("武汉市", "孝感市", "十堰市", "宜昌市", "鄂州市");
        List<String> list3 = List.of("石家庄市", "唐山市", "邢台市", "保定市", "张家口市");

        map.put("江苏省", list1);
        map.put("湖北省", list2);
        map.put("河北省", list3);

        for (Map.Entry<String, List<String>> entry : map.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
```

```txt [cmd 控制台]
江苏省: [南京市, 扬州市, 苏州市, 无锡市, 常州市]
湖北省: [武汉市, 孝感市, 十堰市, 宜昌市, 鄂州市]
河北省: [石家庄市, 唐山市, 邢台市, 保定市, 张家口市]
```

:::





