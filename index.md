---
title: 首页
layout: home
---

这里是网站首页的实际内容（Markdown语法）

# 经验分享
- 快速开发
- 静态分析
- 模块化自测验证
- Bug定位
- AI协助解决问题

# 工具分享
- Vim
- just-the-docs

# 密码学技术
- 对称加密
- 非对称加密
- 后量子密码学
- 全同态加密
- 国密

# 编程技术
- Python
- C语言

# 通信技术
- 信号与系统
- 通信原理
- 信息论

# 站外导航
## 密码学规范
- AES规范
[FIPS-197-upd1]

- AES-GCM规范
[SP800-38d]

- AES-XTS规范
[SP800-38e]

- AES-CCM规范
[SP800-38c]

- AES ECB/CBC/CTR/OFB/CFB规范
[SP800-38a]

- CKMS密码学密钥管理系统
[SP800-152],[SP800-130]

- CMAC规范
[SP800-38b]

- ECDSA
[FIPS-186-5],
[SP800-186],
[sec1-v2],
[sec2-v2]

- EdDSA
[FIPS-186-5],
[SP800-186],
[rfc8032]

- Hash
(SHA1,SHA224,SHA256,SHA384,SHA512,SHA3-224,SHA3-256,SHA3-384,SHA3-512, SHAKE256)
[FIPS-180-4],
[FIPS-202]

- HMAC
[FIPS-198-1]

- ML-DSA
[FIPS-204]

- ML-KEM
[FIPS-203],
[SP800-227.ipd]

- SLH-DSA
[FIPS-205]

- 随机数RNG
[SP800-90Ar1]

- RSA
[FIPS-186-5],
[rfc8017]

## 密码学算法验证
NIST 加密算法验证计划 （CAVP）
[CAVP]

{: .note}
> NIST 加密算法验证计划 （CAVP） 提供对已批准（即 FIPS 批准和 NIST 推荐）加密算法及其各个组件的验证测试。加密算法验证是加密模块验证的前提条件。FIPS 批准的算法列表可在 SP 800-140C 和 SP 800-140D 中找到。

1. AES和3DES的 测试向量
[test-vector-Block-Ciphers]

2. CMAC, CCM, GCM, XPN, XTS, KeyWrap的 测试向量
[test-vector-Block-Ciphers-Modes]

3. DSA, RSA, ECDSA 测试向量
[test-vector-Digital-Signatures]

4. KBKDF 算法的 测试向量
[test-vector-Key-Derivation]

5. 密钥管理 - 密钥协议方案 （KAS） 和密钥确认 （SP 800-56A）的 测试向量
[test-vector-Key-Management]

6. HMAC测试向量
[test-vector-Message-Authentication]

7. DRBG测试向量
[test-vector-RNG]

8. 安全哈希 SHA-1 SHA-2 SHA-3测试向量
[test-vector-SHA]

9. 组件 测试向量
ECC-CDH (SP 800-56A),
ECDSA Signature (FIPS 186-4),
KDF (SP 800-135),
RSA PKCS1-v1.5 RSASP1 (FIPS 186-4),
RSA PKCS1-vPSS RSASP1 (FIPS 186-4),
RSADP Decryption (SP 800-56B; PKCS#1 v2.1)
[test-vector-Component-Testing]

[FIPS-197-upd1]:https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197-upd1.pdf
[SP800-38d]:https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38d.pdf
[SP800-38e]:https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38e.pdf
[SP800-38c]:https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38c.pdf
[SP800-38a]:https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38a.pdf
[SP800-152]:https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-152.pdf
[SP800-130]:https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-130.pdf
[SP800-38b]:https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-38b.pdf
[FIPS-186-5]:https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf
[SP800-186]:https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-186.pdf
[sec1-v2]:https://www.secg.org/sec1-v2.pdf
[sec2-v2]:https://www.secg.org/sec2-v2.pdf
[FIPS-186-5]:https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf
[SP800-186]:https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-186.pdf
[rfc8032]:https://datatracker.ietf.org/doc/rfc8032
[FIPS-180-4]:https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf
[FIPS-202]:https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf
[FIPS-198-1]:https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.198-1.pdf
[FIPS-204]:https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf
[FIPS-203]:https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf
[SP800-227.ipd]:https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-227.ipd.pdf
[FIPS-205]:https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.205.pdf
[SP800-90Ar1]:https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-90Ar1.pdf
[FIPS-186-5]:https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf
[rfc8017]:https://www.rfc-editor.org/rfc/pdfrfc/rfc8017.txt.pdf
[CAVP]:https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program
[test-vector-Block-Ciphers]:https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/block-ciphers
[test-vector-Block-Ciphers-Modes]:https://csrc.nist.gov/Projects/Cryptographic-Algorithm-Validation-Program/CAVP-TESTING-BLOCK-CIPHER-MODES
[test-vector-Digital-Signatures]:https://csrc.nist.gov/Projects/Cryptographic-Algorithm-Validation-Program/Digital-Signatures
[test-vector-Key-Derivation]:https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/key-derivation
[test-vector-Key-Management]:https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/key-management
[test-vector-Message-Authentication]:https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/message-authentication
[test-vector-RNG]:https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/random-number-generators
[test-vector-SHA]:https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/secure-hashing
[test-vector-Component-Testing]:https://csrc.nist.gov/projects/cryptographic-algorithm-validation-program/component-testing
