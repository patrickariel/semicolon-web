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
              "sha256-dqKh4BRuOjPk8oHn3pKwP63zSs4I10SYIu1/raC8y5g=";
            query-engine-hash =
              "sha256-PBuVZ6Cw7rIwB89RMC6iY3ZyBuo/BcQgM2wsX5ggzWg=";
            libquery-engine-hash = ''
              sha256-d+XWz9BbDSz/ZbycF64bA+bvm5pnaF7l5le/KTfRwUQ=
            '';
            schema-engine-hash =
              "sha256-coTYlofR4KTlbrygv9/NNUlnDp3tuCBUXb66LPAcKF8=";
          }).fromNpmLock ./package-lock.json;
        in {
          default = pkgs.mkShell {
            inherit (prisma) shellHook;
            buildInputs = with pkgs; [ nodejs postgresql openssl ];
          };
        });
    };
}
