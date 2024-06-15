{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    prisma-utils.url = "github:VanCoding/nix-prisma-utils";
  };
  outputs = inputs@{ self, nixpkgs, prisma-utils, ... }:
    let
      forEachSystem = f:
        nixpkgs.lib.genAttrs [ "aarch64-linux" "x86_64-linux" ]
        (system: f nixpkgs.legacyPackages.${system});
    in {
      devShells = forEachSystem (pkgs:
        let
          prisma = (prisma-utils.lib.prisma-factory {
            nixpkgs = pkgs;
            prisma-fmt-hash =
              "sha256-UCk1WGDbcXTXyfqAnFoVaWZl1Hd8H0m0LxripbWSDm8=";
            query-engine-hash =
              "sha256-RJ4vJ2FmiknAInkVrpMP1SCAnZJZNSdJahSECdHi1jA=";
            libquery-engine-hash =
              "sha256-ylE/SHHRlQu2uJRSaXxZCD/sHwF2deHOULYWG0qhZMo=";
            schema-engine-hash =
              "sha256-pr/ioDDU0A5LNIeWzWjNnq/A5Lfn7lFxqWJfA1CER+k=";
          }).fromNpmLock ./package-lock.json;
        in {
          default = pkgs.mkShell {
            inherit (prisma) shellHook;
            buildInputs = with pkgs; [ nodejs postgresql openssl ];
          };
        });
    };
}
