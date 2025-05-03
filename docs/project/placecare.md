---
editLink: true
footer: true
---

# placecare😽
| [![GitHub](https://img.shields.io/badge/github-bio--here%2Fplacecare-blue.svg)](https://github.com/bio-here/placecare) | [![Crates.io](https://img.shields.io/crates/v/placecare.svg)](https://crates.io/crates/placecare) | [![Documentation](https://docs.rs/placecare/badge.svg)](https://docs.rs/placecare) | [![License](https://img.shields.io/crates/l/MIT.svg)]() |
| --- | --- | --- | --- |

***placecare*** is a tool for predicting cis-regulatory elements based on string search algorithms using the [PLACE database](https://www.dna.affrc.go.jp/PLACE/?action=newplace).

With placecare, you can:

1. Upload sequence files to search for cis-regulatory elements.

2. Quickly retrieve related information through PLACE database IDs and ACs
(Data from the place.seq file provided by the official PLACE website)


## Installation

If you have the Rust toolchain installed on your computer, you can install our command-line program using the following command:

```shell
cargo install placecare
```

If you haven't installed the Rust toolchain, you can also download our pre-compiled binary files directly from GitHub Release:
- [Release](https://github.com/bio-here/placecare/release)

> [!Tip]
> We have pre-compiled programs for Windows and Linux amd64 versions. If you want to use placecare on other platforms,
> the best approach is to install it through the Rust toolchain.


If you want to use our library, you just need:
```shell
cargo add placecare
```

## Usage

### Using the Command-line Program

After installing the `placecare` command-line program, you can use it as follows:

- **Search for Cis-regulatory Elements**

The command-line program currently supports **file input** `-i FILE_PATH` and **direct input** `-s TEXT`.

There are also two output methods: **print output** `-p` and **file output** `-w -o FILE_PATH`. You can use both output methods simultaneously.
```shell
placecare search -i ./a.fasta -p
placecare search -s ATCATCATTATATATAACGGGGCCC -p

placecare search -i ./a.fasta -w -o output.txt
placecare search -s ATCATCATTATATATAACGGGGCCC -w -o output.txt
```

- **Query the PLACE Database by ID and AC**

When querying, you need to choose which method to query by: **using ID** `-q` and **using AC** `-a`.

> [!Important]
> When using file input, each line should contain one ID or AC
```shell
placecare query -i ./id.txt -q -p
placecare query -i ./ac.txt -a -p
placecare query -s TATABOX1 -q -p

placecare query -s ./id.txt -q -w -o output.txt
```


### Using Our Library

This section explains how to use our library.
The core functionality of placehere is written in the `place_search` module, I/O operations are written in the `io` module,
and the `place_desc` module contains descriptions of the PLACE data.

#### Searching for Elements

We provide multiple ways to input sequences, as shown below:
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

Then we can perform the search:
```rust
use placecare::place_search::Search;

// Search for a single element
let result = Search::search_element(input).unwrap();

// Search for multiple elements
let result = Search::search_elements(input).unwrap();
```

You can check the definitions in the `place_desc` module to understand the output information.

#### Querying Element Information

We can use the following methods to query information about elements in the PLACE database.
```rust
use placecare::search::Search;

// The function will return a vector of Option<SeqDesc>
// for which is a result of the input sequence.
let e1: Vec<Option<SeqDesc>> = query_elements_by_id(&vec!["TATABOX1", "TATABOX2"]);
let e2: Vec<Option<SeqDesc>> = query_elements_by_ac(&vec!["S000023", "S000260"]);
```

## Tips

### IUPAC Ambiguous Bases
The PLACE database uses IUPAC ambiguous base symbols ([Wikipedia](https://en.wikipedia.org/wiki/Nucleic_acid_notation)) to represent multiple possible bases.

### Citation
If your article uses this software, it means you used the libraries used by this software, please cite the following articles:

> - [PLACE](https://academic.oup.com/nar/article/27/1/297/1238435?login=false)
>
> Higo, K., Ugawa, Y., Iwamoto, M. and Korenaga, T. "Plant cis-acting regulatory DNA elements (PLACE) database: 1999" Nucleic Acids Research, Volume 27, Issue 1, 1999, Pages 297-300.

> - [Rust-Bio](https://academic.oup.com/bioinformatics/article/32/3/444/1743419?login=false)
>
> Köster, J. (2016). Rust-Bio: a fast and safe bioinformatics library. Bioinformatics, 32(3), 444-446.