---
editLink: true
footer: true
---

# seq-here😼
| [![GitHub](https://img.shields.io/badge/github-bio--here%2Fseq--here-blue.svg?style=for-the-badge)](https://github.com/bio-here/seq-here?style=for-the-badge) | [![Crates.io](https://img.shields.io/crates/v/seq-here.svg?style=for-the-badge)](https://crates.io/crates/seq-here) | [![Documentation](https://img.shields.io/docsrs/seq-here/latest?style=for-the-badge)](https://docs.rs/seq-here) | [![License](https://img.shields.io/crates/l/MIT.svg?style=for-the-badge)]() |
| --- | --- | --- | --- |

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/bio-here/seq-here)

***seq-here*** 是一个用于生物序列文件处理的快速工具。

seq-here 提供多种功能用于生物序列文件处理，
包括获取基本信息、处理序列文件和提取特定序列片段。

## 安装

你可以使用 cargo 安装 seq-here：

```shell
cargo install seq-here
```

如果你并没有安装Rust工具链，你也可以在 GitHub的Release中 直接下载我们编译后的二进制文件：
- [release](https://github.com/bio-here/seq-here/release)

> [!Tip]
> 我们预编译了 Windows 和 Linux 的 amd64版本的程序，如果你想在这些平台之外使用placecare，
> 最好的方法是通过Rust工具链安装。

或者你可以从源代码构建：

```shell{3,4}
git clone git@github.com:bio-here/seq-here.git
cd seq-here
cargo build --release
cp target/release/seq-here /usr/local/bin

seq-here --version
```

### 库集成

你也可以在你的项目中使用 seq-here 的 lib crate ，只需在 Cargo.toml 中添加：

```toml
[dependencies]
seq-here = "0.1.0"
```

## 使用方法

要查看详细的使用信息，可以运行：

```shell
seq-here --help
```

### Info：获取输入序列文件的基本信息

```shell
# Fasta 文件信息
seq-here info fa your_files.fasta,your_files2.fasta

# Fastq 文件信息
seq-here info fq your_files.fastq

# Gff/Gtf 文件信息（暂不支持 Gff2）
seq-here info gff your_files.gff

# -o, --output：输出方式，默认为 println
# 3 个选项：println, file, csv
# 文件将被存放在当前目录
seq-here info fa your_files.fasta -o file

# 输入一个目录以获取该目录下所有文件的信息
seq-here info fa your_dir
```

### Process：转换或处理传入的序列文件

```shell
# 合并文件
seq-here process combine files_folder
seq-here process combine file1,file2,file3

# -o, --output <OutputFile>
# 输出文件名，如果值是一个目录，则会在该目录中使用默认文件名
seq-here process combine files_folder -o ./output/all.txt
```

### Extract：提取指定的序列片段或文件数据

```shell
# 按 ID 提取序列片段
seq-here extract segment input.fasta --file sequence_id.txt
seq-here extract segment input.fasta --str GhID00000001

# 按位置提取序列的特定部分（基于0的坐标）
seq-here extract segment input.fasta --str GhID00000001 --start 100 --end 200
seq-here extract segment input.fasta --file ids.txt --start 50 --end 150

# 按给定的注释文件提取序列
seq-here extract explain --seq input.fasta --gff input.anno.gff -o output_path.fasta

# 仅从注释中提取特定特征类型
seq-here extract explain --seq input.fasta --gff input.anno.gff --type CDS,gene,mRNA -o output_path
```

## 库函数

seq-here 提供了用于不同目的的三个主要模块：

1. **info**：获取输入序列文件的基本信息
2. **process**：处理传入的序列文件
3. **extract**：提取指定的序列片段或文件数据

### Info 模块示例

```rust
use seq_here::info::{self, InfoOutput};
use std::path::{Path, PathBuf};

let paths = vec![PathBuf::from("tests/test.fa")];
info::InfoFa::by_println(paths.clone());
info::InfoFa::by_file(paths);
```

### Process 模块示例

```rust
use seq_here::process::{self};
use std::path::PathBuf;

// 将多个文件合并成一个
let input_files = vec![PathBuf::from("file1.txt"), PathBuf::from("file2.txt")];
let output_file = PathBuf::from("combined.txt");
seq_here::process::ConvertCombine::combine_all(input_files, output_file);
```

### Extract 模块示例

```rust
use seq_here::extract::{ExtractSegment, ExtractExplain};
use std::path::PathBuf;

// 按 ID 提取序列
let input_files = vec![PathBuf::from("sequence.fasta")];
let output_file = PathBuf::from("extracted.fasta");
let id = "sequence_id".to_string();

// 提取匹配 ID 的完整序列
ExtractSegment::extract_id(input_files.clone(), id.clone(), output_file.clone(), None, None);

// 从序列中提取特定片段（位置10到50）
ExtractSegment::extract_id(input_files, id, output_file, Some(10), Some(50));

// 从注释文件中提取特征
let seq_files = vec![PathBuf::from("genome.fasta")];
let anno_files = vec![PathBuf::from("annotations.gff")];
let output_dir = PathBuf::from("extracted_features");

// 提取所有注释特征
ExtractExplain::extract(seq_files.clone(), anno_files.clone(), output_dir.clone(), None);

// 只提取 CDS 和基因特征
let feature_types = Some(vec!["CDS".to_string(), "gene".to_string()]);
ExtractExplain::extract(seq_files, anno_files, output_dir, feature_types);
```

## 提示

### 引用

如果您的文章使用了本软件，也即使用了本软件使用的库，那么请引用以下文章：

> - [Rust-Bio](https://academic.oup.com/bioinformatics/article/32/3/444/1743419?login=false)
>
> Köster, J. (2016). Rust-Bio: a fast and safe bioinformatics library. Bioinformatics, 32(3), 444-446.