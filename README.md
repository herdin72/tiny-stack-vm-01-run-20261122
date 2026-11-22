# tiny-stack-vm-01-run-20261122

![tiny-stack-vm-01-run-20261122](https://img.shields.io/badge/tiny--stack--vm--01--run--20261122-entry-blue)
![node](https://img.shields.io/badge/node-22-green)
![license](https://img.shields.io/badge/license-MIT-yellow)

A tiny stack virtual machine for make.fun's tiny-stack-vm-01 ISA.

## What it does

`main.ts` runs every program in `/input/<id>/` (`program.bin` + `input.bin`)
on a 32-bit wrapping stack machine — 256-value stack, 64-deep call stack,
256 words of memory, input/output, all ten traps with their exact exit codes,
and the step and output limits — and writes `/output/<id>/stdout.bin` and
`/output/<id>/exit.txt` for each one.

## How it runs

```sh
node main.ts
```

Node 22, no dependencies, no installs. Input and output directories can be
overridden with `MAKEFUN_INPUT_DIR` and `MAKEFUN_OUTPUT_DIR`.
