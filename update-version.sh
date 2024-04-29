## Update Control Manifest Version

FilePath_Control_Manifest="$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/CustomCalendar/ControlManifest.Input.xml"

control_manifest_version=$(LC_ALL=en_US.utf8 grep -oP '<control [^>]*version="\K[^"]+' $FilePath_Control_Manifest)

regex="([0-9]+).([0-9]+).([0-9]+)"
if [[ $control_manifest_version =~ $regex ]]; then
  major="${BASH_REMATCH[1]}"
  minor="${BASH_REMATCH[2]}"
  build="${BASH_REMATCH[3]}"
  build=$((build + 2))
fi

control_manifest_new_version="${major}.${minor}.${build}"

sed -i "s/\(<control [^>]*version=\"\)[^\"]*\"/\1$control_manifest_new_version\"/" $FilePath_Control_Manifest

## Update Solution Version

FilePath_Solution="$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/Solutions/src/Other/Solution.xml"

solution_version=$(LC_ALL=en_US.utf8 grep -oP '<Version>\K[^</]+' $FilePath_Solution)

if [[ $solution_version =~ $regex ]]; then
  major="${BASH_REMATCH[1]}"
  minor="${BASH_REMATCH[2]}"
  build="${BASH_REMATCH[3]}"
  build=$((build + 2))
fi

solution_new_version="${major}.${minor}.${build}"

sed -i "s/\(<LocalizedName [^>]*description=\".* OPG_OSS_CustomCalendar_v\)[^\"]*\"/\1$solution_new_version\"/" $FilePath_Solution
sed -i "s/\(<Version>\)[^</]*/\1$solution_new_version/" $FilePath_Solution
