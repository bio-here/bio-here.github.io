---
editLink: true
footer: true
---

# seq-here😼
| [![GitHub](https://img.shields.io/badge/github-bio--here%2Fseq--here-blue.svg?style=for-the-badge)](https://github.com/bio-here/seq-here?style=for-the-badge) | [![Crates.io](https://img.shields.io/crates/v/seq-here.svg?style=for-the-badge)](https://crates.io/crates/seq-here) | [![Documentation](https://img.shields.io/docsrs/seq-here/latest?style=for-the-badge)](https://docs.rs/seq-here) | [![License](https://img.shields.io/crates/l/MIT.svg?style=for-the-badge)]() |
| --- | --- | --- | --- |

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/bio-here/seq-here)

***seq-here*** is a fast tool for bio-sequence file processing.

seq-here provides multiple functions for bio-sequence file processing,
 including obtaining basic information, processing sequence files, and extracting specific sequence segments.

## Installation

You can install seq-here using cargo:

```shell
cargo install seq-here
```

If you haven't installed the Rust toolchain, you can also download our pre-compiled binary files directly from GitHub Release:
- [Release](https://github.com/bio-here/seq-here/release)

> [!Tip]
> We have pre-compiled programs for Windows and Linux amd64 versions. If you want to use placecare on other platforms,
> the best approach is to install it through the Rust toolchain.

Or you can build it from source:

```shell{3,4}
git clone git@github.com:bio-here/seq-here.git
cd seq-here
cargo build --release
cp target/release/seq-here /usr/local/bin

seq-here --version
```

### Library Integration

You can also use seq-here as a library in your project by adding the following to your Cargo.toml:

```toml
[dependencies]
seq-here = "0.1.0"
```

## Usage

To see detailed usage information, you can run:

```shell
seq-here --help
```

### Info: Get basic information about the input sequence file(s)

```shell
# Fasta file information
seq-here info fa your_files.fasta,your_files2.fasta

# Fastq file information
seq-here info fq your_files.fastq

# Gff/Gtf file information, Gff2 not supported yet
seq-here info gff your_files.gff

# -o, --output: output method, default is println
# 3 options: println, file, csv
# The file will be put in the current directory
seq-here info fa your_files.fasta -o file

# Input a directory to get all files information below the directory
seq-here info fa your_dir
```

### Process: Convert or process incoming sequence file(s)

```shell
# Combine files
seq-here process combine files_folder
seq-here process combine file1,file2,file3

# -o, --output <OutputFile>
# Output file name, if value is a directory, it would use default file_name in the directory
seq-here process combine files_folder -o ./output/all.txt
```

### Extract: Extract specified sequence segment or file data

```shell
# Extract a sequence segment by id
seq-here extract segment input.fasta --file sequence_id.txt
seq-here extract segment input.fasta --str GhID00000001

# Extract a specific portion of a sequence by position (0-based coordinates)
seq-here extract segment input.fasta --str GhID00000001 --start 100 --end 200
seq-here extract segment input.fasta --file ids.txt --start 50 --end 150

# Extract sequences by given annotation file
seq-here extract explain --seq input.fasta --gff input.anno.gff -o output_path.fasta

# Extract only specific feature types from annotations
seq-here extract explain --seq input.fasta --gff input.anno.gff --type CDS,gene,mRNA -o output_path
```

## Library Functions

There are 3 modules in seq-here for different purposes:

1. **info**: Get basic information about the input sequence file(s)
2. **process**: Process incoming sequence file(s)
3. **extract**: Extract specified sequence segment or file data

### Info Module Example

```rust
use seq_here::info::{self, InfoOutput};
use std::path::{Path, PathBuf};

let paths = vec![PathBuf::from("tests/test.fa")];
info::InfoFa::by_println(paths.clone());
info::InfoFa::by_file(paths);
```

### Process Module Example

```rust
use seq_here::process::{self};
use std::path::PathBuf;

// Combine multiple files into one
let input_files = vec![PathBuf::from("file1.txt"), PathBuf::from("file2.txt")];
let output_file = PathBuf::from("combined.txt");
seq_here::process::ConvertCombine::combine_all(input_files, output_file);
```

### Extract Module Example

```rust
use seq_here::extract::{ExtractSegment, ExtractExplain};
use std::path::PathBuf;

// Extract sequence by ID
let input_files = vec![PathBuf::from("sequence.fasta")];
let output_file = PathBuf::from("extracted.fasta");
let id = "sequence_id".to_string();

// Extract full sequence matching the ID
ExtractSegment::extract_id(input_files.clone(), id.clone(), output_file.clone(), None, None);

// Extract a specific segment (positions 10 to 50) from the sequence
ExtractSegment::extract_id(input_files, id, output_file, Some(10), Some(50));

// Extract features from annotation files
let seq_files = vec![PathBuf::from("genome.fasta")];
let anno_files = vec![PathBuf::from("annotations.gff")];
let output_dir = PathBuf::from("extracted_features");

// Extract all annotated features
ExtractExplain::extract(seq_files.clone(), anno_files.clone(), output_dir.clone(), None);

// Extract only CDS and gene features
let feature_types = Some(vec!["CDS".to_string(), "gene".to_string()]);
ExtractExplain::extract(seq_files, anno_files, output_dir, feature_types);
```

## Tips

### Citation
If your article uses this software, it means you used the libraries used by this software, please cite the following articles:

> - [Rust-Bio](https://academic.oup.com/bioinformatics/article/32/3/444/1743419?login=false)
>
> Köster, J. (2016). Rust-Bio: a fast and safe bioinformatics library. Bioinformatics, 32(3), 444-446.