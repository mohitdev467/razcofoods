import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";

const ModalComponent = ({
  isVisible,
  onClose,
  title,
  children,
  modalContainerStyle,
  modalOverlayStyle,
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay, modalOverlayStyle]}>
        <View style={[styles.modalContainer, modalContainerStyle]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButtonWrapper}
            >
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    position: "relative",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    padding: Responsive.heightPx(2),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: Responsive.font(5),
    fontFamily: "Bold",
    textAlign: "center",
  },
  closeButtonWrapper: {
    position: "absolute",
    top: -10,
    right: Responsive.widthPx(0.8),
  },

  closeButton: {
    fontSize: Responsive.font(6),
    fontWeight: "Regular",
  },
  modalBody: {
    marginTop: Responsive.heightPx(2),
  },
});

export default ModalComponent;
