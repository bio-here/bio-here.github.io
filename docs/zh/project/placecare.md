---
editLink: true
footer: true
---

# placecare😽
| [![GitHub](https://img.shields.io/badge/github-bio--here%2Fplacecare-blue.svg?style=for-the-badge)](https://github.com/bio-here/placecare) | [![Crates.io](https://img.shields.io/crates/v/placecare?style=for-the-badge)](https://crates.io/crates/placecare) | [![Documentation](https://img.shields.io/docsrs/placecare/latest?style=for-the-badge)](https://docs.rs/placecare) | [![License](https://img.shields.io/crates/l/MIT.svg?style=for-the-badge)]() | 
| --- | --- | --- | --- |

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/bio-here/placecare)

***placecare*** 是一个使用 [PLACE数据库](https://www.dna.affrc.go.jp/PLACE/?action=newplace) 基于字符串搜索算法预测顺式作用元件的工具。

使用 placecare，你可以：

1. 通过序列文件或片段搜索顺式作用元件。

2. 通过 PLACE 数据库的 id 和 ac 快速获取相关信息
（数据来自 PLACE 官网提供的 place.seq 文件）


## 安装

如果你的电脑上有Rust工具链，你可以使用如下命令安装我们的命令行程序：

```shell
cargo install placecare
```

如果你并没有安装Rust工具链，你也可以在 GitHub的Release中 直接下载我们编译后的二进制文件：
- [Release](https://github.com/bio-here/placecare/releases)

> [!Tip]
> 我们预编译了 Windows 和 Linux 的 amd64版本的程序，如果你想在这些平台之外使用placecare，
> 最好的方法是通过Rust工具链安装。


如果你要使用我们的库，只需要：
```shell
cargo add placecare

```

## 使用

### 使用命令行程序

在你安装了 `placecare` 命令行程序后，你可以这样使用：

- **搜索顺式作用元件**

命令行程序目前支持 **文件输入** `-i FILE_PATH` 和 **直接输入** `-s TEXT`。

输出方式也有两种：**打印输出** `-p` 和 **文件输出** `-w -o FILE_PATH`。你可以同时使用两种方式输出。
```shell
placecare search -i ./a.fasta -p
placecare search -s ATCATCATTATATATAACGGGGCCC -p

placecare search -i ./a.fasta -w -o output.txt
placecare search -s ATCATCATTATATATAACGGGGCCC -w -o output.txt
```

- **根据ID和AC查询PLACE数据库**

查询时需要选择通过哪种方式查询： **使用ID** `-q` 和 **使用AC** `-a` 。

> [!Important]
> 使用 文件输入 时，每行存放一个ID或AC
```shell
placecare query -i ./id.txt -q -p
placecare query -i ./ac.txt -a -p
placecare query -s TATABOX1 -q -p

placecare query -s ./id.txt -q -w -o output.txt
```


### 使用我们的库

这里介绍了我们的库如何使用。
placehere的核心功能编写在 `place_search` 模块中，I/O操作编写在 `io` 模块，
`place_desc` 模块是对PLACE数据的描述文件。

#### 搜索元件

我们提供了多种输入序列的方式，如下所示：
```rust
use placecare::io::RecordDesc;

let input = vec![RecordDesc::new("Gh_01", "TTATAGACTCGATGGCCGCGCGG")];
let input = RecordDesc::from_file("./input.fasta");
let input = RecordDesc::from_string("\
>Gh_01
ATATCCGGATGGCATGCTGATC
");
let input = RecordDesc::from_records(bio::io::fasta::Reader::new("./input.fasta"));

let mut f = File::open("input.txt").unwrap();
let input = RecordDesc::from_reader(f);
```

然后我们可以进行搜索：
```rust
use placecare::place_search::Search;

// 搜索单个元件
let result = Search::search_element(input).unwrap();

// 搜索多个元件
let result = Search::search_elements(input).unwrap();
```

可以查看 `place_desc` 模块中的定义了解输出信息。

#### 查询元件信息

我们可以使用以下方法查询PLACE数据库中的元件信息。
```rust
use placecare::search::Search;

The function will return a vector of Option<SeqDesc>
// for which is a result of the input sequence.
let e1: Vec<Option<SeqDesc>> = query_elements_by_id(&vec!["TATABOX1", "TATABOX2"]);
let e2: Vec<Option<SeqDesc>> = query_elements_by_ac(&vec!["S000023", "S000260"]);
```

## 提示

### IUPAC模糊碱基
PLACE 数据库中使用了 IUPAC 模糊碱基符号 （[WikiPedia](https://en.wikipedia.org/wiki/Nucleic_acid_notation)）来表示多种可能的碱基。

### 引用文献
如果您的文章使用了本软件，也即使用了本软件使用的库，那么请引用以下文章：

> - [PLACE](https://academic.oup.com/nar/article/27/1/297/1238435?login=false)
>
> Higo, K., Ugawa, Y., Iwamoto, M. and Korenaga, T. "Plant cis-acting regulatory DNA elements (PLACE) database: 1999" Nucleic Acids Research, Volume 27, Issue 1, 1999, Pages 297-300.

> - [Rust-Bio](https://academic.oup.com/bioinformatics/article/32/3/444/1743419?login=false)
>
> Köster, J. (2016). Rust-Bio: a fast and safe bioinformatics library. Bioinformatics, 32(3), 444-446.