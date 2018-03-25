use Mix.Releases.Config,
    # This sets the default release built by `mix release`
    default_release: :default,
    # This sets the default environment used by `mix release`
    default_environment: :dev

# For a full list of config options for both releases
# and environments, visit https://hexdocs.pm/distillery/configuration.html


# You may define one or more environments in this file,
# an environment's settings will override those of a release
# when building in that environment, this combination of release
# and environment configuration is called a profile

environment :dev do
  set dev_mode: true
  set include_erts: false
  set cookie: :"xu8ji$BO@I0_H>v{q}9d!$Y|S!^(xuwxk]WQUoc~,.PN@D}%E^czxikTSP3zSPSA"
end

environment :prod do
  set include_erts: true
  set include_src: false
  set cookie: :"ZV.l=yUP$VCSIk<:Sn.$p5<jR=oK)QaF???!xP@!_w;8`.2Qp5ZelVi5|55}&cg["
end

# You may define one or more releases in this file.
# If you have not set a default release, or selected one
# when running `mix release`, the first release in the file
# will be used by default

release :pleague do
  set version: current_version(:pleague)
end

