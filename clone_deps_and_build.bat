cd external
git clone --depth 1 https://github.com/zeux/volk.git
git clone --depth 1 https://github.com/msu-graphics-group/vk-utils.git vkutils
cd ..
mkdir build
cd build
cmake ..
make -j8