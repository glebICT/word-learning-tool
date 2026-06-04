const SNIPPETS = [
  {
    language: "Python",
    category: "Mainstream / Web",
    code: `def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)


print(fib(10))`,
    tell: "Created by Guido van Rossum and first released in 1991, Python is a general-purpose language widely used for web development, scripting, automation, data science, and education.",
  },
  {
    language: "Python",
    category: "Mainstream / Web",
    code: `squares = [x * x for x in range(10) if x % 2 == 0]
print(squares)`,
    tell: "Created by Guido van Rossum and first released in 1991, Python is used for general-purpose programming, data analysis, automation, scientific computing, and teaching programming.",
  },

  {
    language: "JavaScript",
    category: "Mainstream / Web",
    code: `const greet = (name) => {
    console.log(\`Hello, \${name}!\`);
};


greet("world");`,
    tell: "Created in 1995 by Brendan Eich at Netscape, JavaScript is the main language of the web and is used for browser apps, servers, and interactive user interfaces.",
  },
  {
    language: "JavaScript",
    category: "Mainstream / Web",
    code: `fetch("/api/users")
    .then((res) => res.json())
    .then((users) => console.log(users));`,
    tell: "Created in 1995 by Brendan Eich at Netscape, JavaScript powers web front ends, server-side apps through Node.js, and API-driven applications.",
  },

  {
    language: "Java",
    category: "JVM",
    code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`,
    tell: "Created by James Gosling at Sun Microsystems and released in 1995, Java is widely used for enterprise software, Android apps, backend systems, and large-scale business applications.",
  },
  {
    language: "Java",
    category: "JVM",
    code: `List<Integer> nums = new ArrayList<>();
for (int i = 0; i < 5; i++) {
    nums.add(i * i);
}
System.out.println(nums);`,
    tell: "Created by James Gosling at Sun Microsystems and released in 1995, Java is a mainstream choice for enterprise systems, Android, and cross-platform server software.",
  },

  {
    language: "C",
    category: "Systems",
    code: `#include <stdio.h>


int main(void) {
    printf("Hello, world!\\n");
    return 0;
}`,
    tell: "Created by Dennis Ritchie in the early 1970s at Bell Labs, C is used for operating systems, embedded software, compilers, and performance-critical systems programming.",
  },
  {
    language: "C",
    category: "Systems",
    code: `struct Point {
    int x;
    int y;
};


struct Point p = {3, 4};
printf("%d, %d\\n", p.x, p.y);`,
    tell: "Created by Dennis Ritchie in the early 1970s at Bell Labs, C remains a foundation for operating systems, drivers, embedded devices, and low-level software.",
  },

  {
    language: "Ruby",
    category: "Mainstream / Web",
    code: `[1, 2, 3, 4, 5].each do |n|
  puts "n = #{n}"
end`,
    tell: "Created by Yukihiro 'Matz' Matsumoto in the mid-1990s, Ruby is popular for web development, especially with Rails, plus scripting and automation.",
  },
  {
    language: "Ruby",
    category: "Mainstream / Web",
    code: `class Dog
  attr_accessor :name


  def initialize(name)
    @name = name
  end
end`,
    tell: "Created by Yukihiro 'Matz' Matsumoto in the mid-1990s, Ruby is used for web applications, developer tooling, and readable scripting.",
  },

  {
    language: "Go",
    category: "Systems",
    code: `package main


import "fmt"


func main() {
    fmt.Println("Hello, world!")
}`,
    tell: "Created at Google by Robert Griesemer, Rob Pike, and Ken Thompson and released in 2009, Go is widely used for cloud services, network tools, and infrastructure software.",
  },
  {
    language: "Go",
    category: "Systems",
    code: `nums := []int{1, 2, 3}
for i, n := range nums {
    fmt.Printf("%d: %d\\n", i, n)
}`,
    tell: "Created at Google by Robert Griesemer, Rob Pike, and Ken Thompson and released in 2009, Go is common in backend systems, DevOps tools, and distributed services.",
  },

  {
    language: "Bash",
    category: "Scripting",
    code: `#!/bin/bash
for file in *.txt; do
    echo "Found: $file"
done`,
    tell: "Bash was created by Brian Fox for the GNU Project in 1989 and is used for shell scripting, system administration, automation, and Unix-like command-line work.",
  },
  {
    language: "Bash",
    category: "Scripting",
    code: `if [ -f "$1" ]; then
    cat "$1"
else
    echo "No such file: $1" >&2
fi`,
    tell: "Bash was created by Brian Fox for the GNU Project in 1989 and is the standard scripting shell for automation, administration, and command-line workflows.",
  },

  {
    language: "SQL",
    category: "Logic / Query",
    code: `SELECT u.name, COUNT(o.id) AS orders
FROM users u
JOIN orders o ON o.user_id = u.id
GROUP BY u.name
ORDER BY orders DESC;`,
    tell: "SQL was developed in the 1970s by Donald D. Chamberlin and Raymond F. Boyce at IBM, and it is used for querying and managing relational databases.",
  },
  {
    language: "SQL",
    category: "Logic / Query",
    code: `CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE
);`,
    tell: "SQL was developed in the 1970s by Donald D. Chamberlin and Raymond F. Boyce at IBM, and it is the standard language for database definition and querying.",
  },

  {
    language: "COBOL",
    category: "Historic / Legacy",
    code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.
       PROCEDURE DIVISION.
           DISPLAY "Hello, world!".
           STOP RUN.`,
    tell: "COBOL was designed in 1959 by a committee led by Grace Hopper and is used in business, government, and legacy mainframe systems.",
  },
  {
    language: "COBOL",
    category: "Historic / Legacy",
    code: `       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-COUNT     PIC 9(4) VALUE 0.
       01 WS-NAME      PIC X(20) VALUE "WORLD".
       PROCEDURE DIVISION.
           ADD 1 TO WS-COUNT.
           DISPLAY "HELLO " WS-NAME.`,
    tell: "COBOL was designed in 1959 by a committee led by Grace Hopper and remains important in finance, insurance, government, and mainframe processing.",
  },

  {
    language: "PL/I",
    category: "Historic / Legacy",
    code: `HELLO: PROCEDURE OPTIONS(MAIN);
   DECLARE NAME CHAR(20) VARYING;
   NAME = 'WORLD';
   PUT SKIP LIST('HELLO, ' || NAME);
END HELLO;`,
    tell: "PL/I was created by IBM in the 1960s and was designed for scientific, engineering, and business computing on mainframes.",
  },

  {
    language: "Eiffel",
    category: "Historic / Legacy",
    code: `class HELLO
create
    make
feature
    make
        do
            print ("Hello, world!%N")
        end
end`,
    tell: "Eiffel was designed by Bertrand Meyer in the late 1980s and is known for teaching software engineering, design by contract, and reliable object-oriented systems.",
  },

  {
    language: "Fortran",
    category: "Historic / Legacy",
    code: `program hello
    implicit none
    integer :: i
    do i = 1, 5
        print *, "Hello", i
    end do
end program hello`,
    tell: "Fortran was created by John Backus and his IBM team in the 1950s and is widely used in numerical computing, science, engineering, and high-performance simulation.",
  },
  {
    language: "Fortran",
    category: "Historic / Legacy",
    code: `      PROGRAM AREA
      REAL R, A
      R = 2.5
      A = 3.14159 * R**2
      WRITE(*,*) 'AREA = ', A
      STOP
      END`,
    tell: "Fortran was created by John Backus and his IBM team in the 1950s and is used heavily in scientific computing, numerical modeling, and engineering software.",
  },

  {
    language: "Pascal",
    category: "Historic / Legacy",
    code: `program Hello;
var
    i: integer;
begin
    for i := 1 to 5 do
        writeln('Hello ', i);
end.`,
    tell: "Pascal was created by Niklaus Wirth in 1970 and was designed for teaching structured programming and later used in software development and education.",
  },

  {
    language: "Ada",
    category: "Historic / Legacy",
    code: `with Ada.Text_IO;
procedure Hello is
begin
    Ada.Text_IO.Put_Line ("Hello, world!");
end Hello;`,
    tell: "Ada was designed in the late 1970s and early 1980s under Jean Ichbiah and was created for reliable, safety-critical software in defense, aerospace, and embedded systems.",
  },

  {
    language: "Lisp",
    category: "Functional",
    code: `(defun factorial (n)
  (if (<= n 1)
      1
      (* n (factorial (- n 1)))))


(format t "~a~%" (factorial 10))`,
    tell: "Lisp was invented by John McCarthy in 1958 and became a major language family for symbolic computing, AI research, and programmable language systems.",
  },

  {
    language: "Scheme",
    category: "Functional",
    code: `(define (map f lst)
  (if (null? lst)
      '()
      (cons (f (car lst)) (map f (cdr lst)))))


(display (map (lambda (x) (* x x)) '(1 2 3)))`,
    tell: "Scheme was created in the 1970s by Guy L. Steele and Gerald Jay Sussman and is used in teaching, research, and functional programming.",
  },

  {
    language: "Smalltalk",
    category: "Historic / Legacy",
    code: `| sum |
sum := 0.
1 to: 10 do: [ :i | sum := sum + i ].
Transcript show: sum printString; cr.`,
    tell: "Smalltalk emerged in the 1970s from Alan Kay, Dan Ingalls, Adele Goldberg, and colleagues at Xerox PARC, and it is influential in education, GUI software, and object-oriented design.",
  },

  {
    language: "BASIC",
    category: "Historic / Legacy",
    code: `10 FOR I = 1 TO 10
20   PRINT "HELLO "; I
30 NEXT I
40 END`,
    tell: "BASIC was created in 1964 by John G. Kemeny and Thomas E. Kurtz and was widely used for education, home computers, and beginner programming.",
  },

  {
    language: "Prolog",
    category: "Logic / Query",
    code: `parent(tom, bob).
parent(bob, ann).


grandparent(X, Z) :-
    parent(X, Y),
    parent(Y, Z).


?- grandparent(tom, Who).`,
    tell: "Prolog was created in 1972 by Alain Colmerauer and Philippe Roussel and is used in logic programming, rule-based systems, linguistics, and AI.",
  },

  {
    language: "APL",
    category: "Array languages",
    code: `avg ← {(+/⍵)÷≢⍵}
avg 1 2 3 4 5`,
    tell: "APL was created by Kenneth E. Iverson in the 1960s and is used for array processing, mathematical work, finance, and concise interactive programming.",
  },

  {
    language: "Algol 68",
    category: "Historic / Legacy",
    code: `BEGIN
   INT n := 10;
   FOR i FROM 1 TO n DO
      print((i, newline))
   OD
END`,
    tell: "ALGOL 68 was designed by a committee led by Adriaan van Wijngaarden and is historically important for language design, structured programming, and algorithm notation.",
  },

  {
    language: "REXX",
    category: "Historic / Legacy",
    code: `/* Greet the user */
say 'What is your name?'
parse pull name
say 'Hello,' name'!'`,
    tell: "REXX was created by Mike Cowlishaw at IBM in the late 1970s and is used for scripting, system administration, and automation on IBM and other platforms.",
  },

  {
    language: "Modula-2",
    category: "Historic / Legacy",
    code: `MODULE Hello;
FROM InOut IMPORT WriteString, WriteLn;
BEGIN
    WriteString("Hello, world!");
    WriteLn;
END Hello.`,
    tell: "Modula-2 was created by Niklaus Wirth in 1978 and was designed for systems programming, modular software, and teaching good software structure.",
  },

  {
    language: "C++",
    category: "Systems",
    code: `#include <iostream>
#include <vector>


int main() {
    std::vector<int> v{1, 2, 3};
    for (auto x : v) std::cout << x << "\n";
    return 0;
}`,
    tell: "C++ was created by Bjarne Stroustrup in the early 1980s and is widely used for systems software, game development, high-performance applications, and large-scale software.",
  },
  {
    language: "C++",
    category: "Systems",
    code: `template <typename T>
T max(T a, T b) {
    return a > b ? a : b;
}`,
    tell: "C++ was created by Bjarne Stroustrup in the early 1980s and is used for performance-critical software, engines, infrastructure, and general-purpose application development.",
  },

  {
    language: "C#",
    category: ".NET",
    code: `using System;


class Program {
    static void Main() {
        Console.WriteLine("Hello, world!");
    }
}`,
    tell: "C# was designed by Anders Hejlsberg at Microsoft and released in 2000, and it is used for .NET desktop apps, web services, game development, and enterprise software.",
  },
  {
    language: "C#",
    category: ".NET",
    code: `var nums = new List<int> { 1, 2, 3 };
var squares = nums.Select(n => n * n).ToList();
foreach (var s in squares) Console.WriteLine(s);`,
    tell: "C# was created by Anders Hejlsberg at Microsoft and released in 2000, and it is widely used across the .NET ecosystem for apps, services, and games.",
  },

  {
    language: "TypeScript",
    category: "Mainstream / Web",
    code: `interface User {
    id: number;
    name: string;
}


const greet = (u: User): string => \`Hi, \${u.name}\`;`,
    tell: "TypeScript was created by Anders Hejlsberg at Microsoft and released in 2012, and it is used for large-scale JavaScript development, especially in web applications.",
  },

  {
    language: "Rust",
    category: "Systems",
    code: `fn main() {
    let nums: Vec<i32> = vec![1, 2, 3];
    for n in &nums {
        println!("{}", n);
    }
}`,
    tell: "Rust was created by Graydon Hoare at Mozilla and first released in 2010, and it is used for safe systems programming, performance-critical software, and tooling.",
  },
  {
    language: "Rust",
    category: "Systems",
    code: `struct Point { x: f64, y: f64 }


impl Point {
    fn norm(&self) -> f64 {
        (self.x * self.x + self.y * self.y).sqrt()
    }
}`,
    tell: "Rust was created by Graydon Hoare at Mozilla and first released in 2010, and it is popular for systems code, embedded work, web infrastructure, and security-sensitive software.",
  },

  {
    language: "Haskell",
    category: "Functional",
    code: `factorial :: Int -> Int
factorial 0 = 1
factorial n = n * factorial (n - 1)


main = print (factorial 10)`,
    tell: "Haskell was standardized in 1990 by a committee of researchers and is used in functional programming, teaching, research, and correctness-focused software.",
  },

  {
    language: "Erlang",
    category: "Functional",
    code: `-module(hello).
-export([greet/1]).


greet(Name) ->
    io:format("Hello, ~s!~n", [Name]).`,
    tell: "Erlang was created at Ericsson in the late 1980s by Joe Armstrong, Robert Virding, and Mike Williams, and it is used for telecom systems, distributed systems, and fault-tolerant services.",
  },

  {
    language: "Elixir",
    category: "Functional",
    code: `defmodule Greeter do
  def hello(name) do
    IO.puts("Hello, #{name}!")
  end
end


Greeter.hello("world")`,
    tell: "Elixir was created by José Valim in 2011 and is used for scalable web applications, distributed systems, and high-concurrency services on the Erlang VM.",
  },

  {
    language: "OCaml",
    category: "Functional",
    code: `let rec fact n =
  if n <= 1 then 1
  else n * fact (n - 1)


let () = Printf.printf "%d\\n" (fact 10)`,
    tell: "OCaml grew out of the Caml family in the 1990s at INRIA and is used in compilers, formal methods, type-driven programming, and research software.",
  },

  {
    language: "F#",
    category: ".NET",
    code: `[<EntryPoint>]
let main argv =
    printfn "%d" (fact 10)
    0`,
    tell: "F# was created by Don Syme at Microsoft Research and released in the mid-2000s, and it is used for functional programming on .NET, data work, and business software.",
  },

  {
    language: "Kotlin",
    category: "JVM",
    code: `fun main() {
    val nums = listOf(1, 2, 3)
    nums.forEach { println("n = $it") }
}`,
    tell: "Kotlin was created by JetBrains and first released in 2011, and it is used for Android apps, backend development, and modern JVM software.",
  },

  {
    language: "Swift",
    category: "Mobile",
    code: `let nums = [1, 2, 3, 4, 5]
let squares = nums.map { $0 * $0 }
print(squares)`,
    tell: "Swift was created by Apple and publicly introduced in 2014, and it is used for iOS, macOS, watchOS, and other Apple platform apps.",
  },

  {
    language: "Scala",
    category: "JVM",
    code: `object Hello extends App {
  val nums = List(1, 2, 3)
  nums.map(_ * 2).foreach(println)
}`,
    tell: "Scala was created by Martin Odersky and released in 2004, and it is used for JVM applications, backend services, and data engineering with tools like Spark.",
  },

  {
    language: "Clojure",
    category: "JVM",
    code: `(defn square [x] (* x x))


(println (map square [1 2 3 4 5]))`,
    tell: "Clojure was created by Rich Hickey and released in 2007, and it is used for functional programming on the JVM, especially in data-centric and concurrent systems.",
  },

  {
    language: "Perl",
    category: "Scripting",
    code: `#!/usr/bin/perl
use strict;
use warnings;


my @nums = (1, 2, 3);
foreach my $n (@nums) {
    print "n = $n\\n";
}`,
    tell: "Perl was created by Larry Wall in 1987 and is used for text processing, system administration, web scripting, and rapid automation.",
  },

  {
    language: "PHP",
    category: "Mainstream / Web",
    code: `<?php
$users = ["Alice", "Bob", "Carol"];
foreach ($users as $u) {
    echo "Hello, $u\\n";
}
?>`,
    tell: "PHP was created by Rasmus Lerdorf in 1994 and is used heavily for server-side web development, especially dynamic websites and content platforms.",
  },

  {
    language: "R",
    category: "Scientific / Data",
    code: `nums <- c(1, 2, 3, 4, 5)
squares <- sapply(nums, function(x) x^2)
print(squares)`,
    tell: "R was created by Ross Ihaka and Robert Gentleman in the early 1990s and is used for statistics, data analysis, visualization, and research.",
  },

  {
    language: "Lua",
    category: "Scripting",
    code: `local function greet(name)
    print("Hello, " .. name)
end


for i = 1, 3 do
    greet("world " .. i)
end`,
    tell: "Lua was created in the early 1990s by Roberto Ierusalimschy, Waldemar Celes, and Luiz Henrique de Figueiredo, and it is used for scripting, embedded systems, and game development.",
  },

  {
    language: "MATLAB",
    category: "Scientific / Data",
    code: `function s = sumSquares(n)
    x = 1:n;
    s = sum(x.^2);
end


disp(sumSquares(10));`,
    tell: "MATLAB was created by Cleve Moler in the late 1970s and is used for numerical computing, engineering, signal processing, and algorithm prototyping.",
  },

  {
    language: "Julia",
    category: "Scientific / Data",
    code: `function fib(n)
    n < 2 ? n : fib(n-1) + fib(n-2)
end


println(fib(10))`,
    tell: "Julia was created by Jeff Bezanson, Stefan Karpinski, Viral Shah, and Alan Edelman and first released in 2012, and it is used for scientific computing, data science, and high-performance numerics.",
  },

  {
    language: "Dart",
    category: "Mobile",
    code: `void main() {
  var nums = [1, 2, 3];
  for (var n in nums) {
    print('n = \$n');
  }
}`,
    tell: "Dart was created by Google and first released in 2011, and it is used for cross-platform mobile apps, especially with Flutter, plus web and desktop apps.",
  },

  {
    language: "Objective-C",
    category: "Mobile",
    code: `#import <Foundation/Foundation.h>


int main(void) {
    @autoreleasepool {
        NSLog(@"Hello, %@!", @"world");
    }
    return 0;
}`,
    tell: "Objective-C was created by Brad Cox and Tom Love in the early 1980s and was used for Apple platform development, especially before Swift became dominant.",
  },

  {
    language: "Tcl",
    category: "Scripting",
    code: `proc greet {name} {
    puts "Hello, $name"
}


foreach n {Alice Bob Carol} {
    greet $n
}`,
    tell: "Tcl was created by John Ousterhout in the late 1980s and is used for scripting, testing, GUI tooling, and embedded automation.",
  },

  {
    language: "Groovy",
    category: "JVM",
    code: `def nums = [1, 2, 3]
nums.each { n ->
    println "n = $n"
}`,
    tell: "Groovy was created by James Strachan and Bob McWhirter and first released in 2003, and it is used for JVM scripting, build tools, and web development with Grails.",
  },

  {
    language: "Nim",
    category: "Modern niche",
    code: `proc greet(name: string) =
  echo "Hello, ", name


for n in @[1, 2, 3]:
  greet($n)`,
    tell: "Nim was created by Andreas Rumpf and first released in 2008, and it is used for systems programming, tooling, and fast, readable applications.",
  },

  {
    language: "Zig",
    category: "Systems",
    code: `const std = @import("std");


pub fn main() void {
    std.debug.print("Hello, {s}!\\n", .{"world"});
}`,
    tell: "Zig was created by Andrew Kelley in the mid-2010s and is used for systems programming, embedded software, and building reliable low-level tools.",
  },

  {
    language: "Crystal",
    category: "Modern niche",
    code: `class Greeter
  def initialize(@name : String)
  end


  def hello
    puts "Hello, #{@name}!"
  end
end


Greeter.new("world").hello`,
    tell: "Crystal was created by Ary Borenszweig and first released in 2014, and it is used for web applications, command-line tools, and Ruby-like productivity with static typing.",
  },

  {
    language: "Visual Basic",
    category: ".NET",
    code: `Module HelloWorld
    Sub Main()
        Dim name As String = "world"
        Console.WriteLine("Hello, " & name & "!")
    End Sub
End Module`,
    tell: "Visual Basic was created by Microsoft in the early 1990s and is used for Windows applications, office automation, business tools, and .NET development.",
  },

  {
    language: "Logo",
    category: "Historic / Legacy",
    code: `to square :size
  repeat 4 [ forward :size right 90 ]
end


square 50`,
    tell: "Logo was developed in the late 1960s by Seymour Papert, Wally Feurzeig, and Cynthia Solomon, and it is used for education, especially teaching programming and geometry.",
  },

  {
    language: "Assembly",
    category: "Systems",
    code: `section .data
    msg db "Hello, world!", 0Ah
    len equ $ - msg


section .text
    global _start
_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall`,
    tell: "Assembly language emerged in the early days of computing and is used for operating-system internals, embedded work, reverse engineering, and performance-critical code.",
  },
  {
    language: "Assembly",
    category: "Systems",
    code: `loop:
    cmp rcx, 0
    je  done
    add rax, rcx
    dec rcx
    jmp loop
done:
    ret`,
    tell: "Assembly language emerged in the early days of computing and is used for hardware-near programming, debugging, optimization, and understanding machine behavior.",
  },

  {
    language: "VHDL",
    category: "Hardware",
    code: `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;


entity AND_GATE is
    port (A, B : in  STD_LOGIC;
          Y    : out STD_LOGIC);
end AND_GATE;


architecture Behavioral of AND_GATE is
begin
    Y <= A and B;
end Behavioral;`,
    tell: "VHDL was created in the 1980s under U.S. Department of Defense and IEEE efforts and is used for digital hardware design, FPGA development, and chip verification.",
  },

  {
    language: "1C",
    category: "Country-specific",
    code: `Процедура ПриНачалеРаботыСистемы()
    Сообщить("Привет, мир!");
    Для Сч = 1 По 5 Цикл
        Сообщить("Итерация: " + Сч);
    КонецЦикла;
КонецПроцедуры`,
    tell: "1C:Enterprise was created by the Russian company 1C in the 1990s and is used for business automation, accounting, ERP systems, and enterprise management.",
  },

  {
    language: "易语言",
    category: "Country-specific",
    code: `.版本 2


.程序集 程序集1


.子程序 _启动子程序, 整数型, , 本子程序在程序启动后最先执行
    信息框 ("你好，世界！", 0, )
    返回 (0)`,
    tell: "易语言, or Easy Programming Language, was created in China in the late 1990s and is used for Windows software development and Chinese-language programming education.",
  },

  {
    language: "Linotte",
    category: "Country-specific",
    code: `âge :: nombre vaut 25
message :: mot vaut "Bonjour"


Saluer:
    début
    affiche message + ", tu as " + âge + " ans!"
    fin`,
    tell: "Linotte was created in the 2000s by Jean-François Savornin and is designed for French-speaking beginners, education, and simple scripting.",
  },

  {
    language: "قلب",
    category: "Country-specific",
    code: `(عرّف مربع (دالة (س) (* س س)))


(قول (مربع ٥))
(قول "مرحبا، يا عالم!")`,
    tell: "قلب, also called Qalb, was developed in 2012 by Ramsey Nasser and is an artistic, Arabic-language functional language meant to challenge English-only programming norms.",
  },

  {
    language: "Uiua",
    category: "Array languages",
    code: `Avg ← ÷⧻⟜/+


&p Avg [1 2 3 4 5]
&p ⇌ "racecar"`,
    tell: "Uiua was created by Kai Schmidt in the 2020s and is used for general-purpose array programming, concise mathematical work, and experimental tacit coding.",
  },

  {
    language: "LOLCODE",
    category: "Esoteric",
    code: `HAI 1.2
I HAS A NAME ITZ "WORLD"
VISIBLE "HAI " AN NAME
KTHXBYE`,
    tell: "LOLCODE emerged in the mid-2000s as an internet joke language, and it is used mainly for humor, education, and playful demonstrations of language design.",
  },

  {
    language: "Befunge",
    category: "Esoteric",
    code: `"!dlroW ,olleH">:#,_@`,
    tell: "Befunge was created by Chris Pressey in 1993 and is used mostly for programming puzzles, language research, and demonstrating two-dimensional control flow.",
  },

  {
    language: "INTERCAL",
    category: "Esoteric",
    code: `DO ,1 <- #13
PLEASE DO ,1 SUB #1 <- #238
PLEASE DO ,1 SUB #2 <- #112
PLEASE READ OUT ,1
PLEASE GIVE UP`,
    tell: "INTERCAL was created in 1972 by Don Woods and James M. Lyon as a parody language, and it is used mainly for humor and programming-language curiosities.",
  },

  {
    language: "Wolfram",
    category: "Scientific / Data",
    code: `fact[0] := 1
fact[n_] := n * fact[n - 1]


Print[fact /@ Range[6]]
Plot[Sin[x] Exp[-x/5], {x, 0, 2 Pi}]`,
    tell: "Wolfram Language was created by Stephen Wolfram and first appeared in 1988, and it is used for symbolic computation, mathematics, data science, and technical computing.",
  },

  {
    language: "BQN",
    category: "Array languages",
    code: `Avg ← +´÷≠


•Show Avg 1‿2‿3‿4‿5
•Show ⌽ "racecar"`,
    tell: "BQN was created by Marshall Lochbaum in the 2020s as a modern APL descendant, and it is used for array programming, mathematical work, and concise algorithmic code.",
  },
];